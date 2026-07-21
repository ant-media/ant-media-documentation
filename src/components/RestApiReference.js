import React, {useEffect, useMemo, useState} from 'react';

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'patch', 'options', 'head'];

function schemaLabel(schema) {
  if (!schema) {
    return '';
  }
  if (schema.$ref) {
    return schema.$ref.split('/').pop();
  }
  if (schema.type === 'array') {
    const item = schemaLabel(schema.items) || 'object';
    return `array of ${item}`;
  }
  if (schema.type) {
    return schema.type;
  }
  return 'object';
}

function collectOperations(spec) {
  const ops = [];
  const paths = spec?.paths || {};
  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') {
      continue;
    }
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!operation) {
        continue;
      }
      const operationId =
        operation.operationId ||
        `${method}_${path}`.replace(/[^\w]+/g, '_');
      ops.push({
        id: operationId,
        method: method.toUpperCase(),
        path,
        summary: operation.summary || operation.description || operationId,
        description: operation.description || '',
        parameters: operation.parameters || [],
        requestBody: operation.requestBody,
        responses: operation.responses || {},
      });
    }
  }
  return ops.sort((a, b) => a.path.localeCompare(b.path) || a.method.localeCompare(b.method));
}

function MethodBadge({method}) {
  return <span className={`ams-api-method ams-api-method--${method.toLowerCase()}`}>{method}</span>;
}

function ParametersTable({parameters}) {
  if (!parameters?.length) {
    return null;
  }
  return (
    <div className="ams-api-block">
      <h4>Parameters</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>In</th>
            <th>Required</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param) => (
            <tr key={`${param.in}-${param.name}`}>
              <td><code>{param.name}</code></td>
              <td>{param.in}</td>
              <td>{param.required ? 'yes' : 'no'}</td>
              <td>{schemaLabel(param.schema) || param.type || '—'}</td>
              <td>{param.description || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RequestBody({requestBody}) {
  if (!requestBody) {
    return null;
  }
  const content = requestBody.content || {};
  const [contentType, media] = Object.entries(content)[0] || [];
  return (
    <div className="ams-api-block">
      <h4>Request body{requestBody.required ? ' (required)' : ''}</h4>
      {contentType && <p><code>{contentType}</code></p>}
      {media?.schema && <p>Schema: <code>{schemaLabel(media.schema)}</code></p>}
      {requestBody.description && <p>{requestBody.description}</p>}
    </div>
  );
}

function Responses({responses}) {
  const entries = Object.entries(responses || {});
  if (!entries.length) {
    return null;
  }
  return (
    <div className="ams-api-block">
      <h4>Responses</h4>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Schema</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([code, response]) => {
            const content = response?.content || {};
            const media = Object.values(content)[0];
            return (
              <tr key={code}>
                <td><code>{code}</code></td>
                <td>{response?.description || '—'}</td>
                <td>{media?.schema ? <code>{schemaLabel(media.schema)}</code> : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Renders one OpenAPI spec as a single page:
 * TOC of methods at the top, then each method as an anchored section.
 */
export default function RestApiReference({specUrl}) {
  const [spec, setSpec] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch(specUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load OpenAPI spec (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setSpec(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [specUrl]);

  const operations = useMemo(() => (spec ? collectOperations(spec) : []), [spec]);
  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) {
      return operations;
    }
    return operations.filter((op) =>
      [op.method, op.path, op.summary, op.id, op.description]
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [operations, filter]);

  if (error) {
    return <p className="ams-api-error">Could not load API reference: {error}</p>;
  }
  if (!spec) {
    return <p>Loading API reference…</p>;
  }

  return (
    <div className="ams-api-reference">
      <div className="ams-api-toc">
        <div className="ams-api-toc-header">
          <h2 id="methods">Methods</h2>
          <input
            className="ams-api-filter"
            type="search"
            placeholder="Filter methods…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter methods"
          />
        </div>
        <p className="ams-api-toc-count">
          {filtered.length} of {operations.length} methods
        </p>
        <ul className="ams-api-toc-list">
          {filtered.map((op) => (
            <li key={op.id}>
              <a href={`#${op.id}`}>
                <MethodBadge method={op.method} />
                <code className="ams-api-toc-path">{op.path}</code>
                <span className="ams-api-toc-summary">{op.summary}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="ams-api-operations">
        {filtered.map((op) => (
          <section key={op.id} id={op.id} className="ams-api-operation">
            <h3 className="ams-api-operation-title">
              <MethodBadge method={op.method} />
              <code>{op.path}</code>
            </h3>
            <p className="ams-api-operation-summary">{op.summary}</p>
            {op.description && op.description !== op.summary && (
              <p>{op.description}</p>
            )}
            <p className="ams-api-operation-id">
              operationId: <code>{op.id}</code>
            </p>
            <ParametersTable parameters={op.parameters} />
            <RequestBody requestBody={op.requestBody} />
            <Responses responses={op.responses} />
            <p className="ams-api-back-top">
              <a href="#methods">Back to methods</a>
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
