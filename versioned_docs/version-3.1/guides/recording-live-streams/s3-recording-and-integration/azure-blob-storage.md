---
title: Azure Blob Storage
description: Record streams to Azure Blob Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Azure Blob Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Record Streams to Azure Blob Storage

Azure Blob Storage integrates differently from the other providers in this section: instead of Ant Media Server uploading files through an S3-compatible API, you mount the blob container directly onto the server's filesystem with `blobfuse`. Recordings just land in what looks like a local directory — there's no S3 credentials to enter in the AMS panel, and no HTTP Forwarding step needed afterward.

By the end of this guide, you'll have an Azure Blob Storage container mounted onto your Ant Media Server instance, so recordings write straight into it.

## Step 1: Install Blobfuse

Install `blobfuse2` on the same instance where Ant Media Server is running. Follow [Microsoft's installation guide](https://learn.microsoft.com/en-us/azure/storage/blobs/blobfuse2-how-to-deploy?tabs=Ubuntu#option-1-install-blobfuse2-from-the-microsoft-software-repositories-for-linux), adjusting the OS distribution and version for your setup.

## Step 2: Create a Storage Account and Container

1. In the Azure Portal, search for **Storage accounts** and create one. Select your subscription and resource group, and pick a name and region — using the same region as your Ant Media Server instance gives better read/write speed.
2. Once created, go to **Containers** under Data Storage and create a container with default settings.

   ![](@site/static/img/recording-live-streams/s3-integration/azure-blob-storage/blob-storage-container.png)

3. Go to **Access keys** under Security + networking and copy an access key — you'll need it in the next step.

:::important
Treat the storage account access key like a password. Don't commit it to a repository, paste it into a screenshot, or share it outside of the blobfuse configuration file.
:::

## Step 3: Create the Blobfuse Configuration File

Create a YAML file for the fuse connection — for example, `fuse_connection.yaml` in a `blobfuse_config` folder in your home directory. It needs the storage account name, access key, endpoint, and container name:

```yaml
allow_other: true

logging:
  type: syslog
  level: log_debug

components:
  - libfuse
  - stream
  - attr_cache
  - azstorage

libfuse:
  attribute-expiration-sec: 120
  entry-expiration-sec: 120
  negative-entry-expiration-sec: 240

stream:
  block-size-mb: 1
  max-buffers: 4
  buffer-size-mb: 128

attr_cache:
  max-size-mb: 1024
  timeout-sec: 3600

azstorage:
  type: block
  account-name: <STORAGE_ACCOUNT_NAME>
  account-key: <STORAGE_ACCOUNT_ACCESS_KEY>
  endpoint: https://<STORAGE_ACCOUNT_NAME>.blob.core.windows.net/
  mode: key
  container: <CONTAINER_NAME>
```

## Step 4: Mount the Container

Mount the streams directory of your Ant Media Server application onto the storage account. For the `live` application:

```bash
sudo blobfuse2 mount /usr/local/antmedia/webapps/live/streams --config-file ~/blobfuse_config/fuse_connection.yaml -o allow_other
```

After mounting, every recording produced by the `live` application writes directly into the Azure Storage account container.

You now have Ant Media Server recording live streams directly into Azure Blob Storage, mounted transparently as a local directory.

## Troubleshooting

- **Mount fails, or recordings never appear in the container** — the config above sets `logging: type: syslog` at `log_debug` level, so blobfuse2 writes its own failures (bad account name/key, wrong endpoint, container name typo) to syslog rather than to any AMS log. Check syslog on the server first.
- **Recordings keep landing in a local folder instead of the container** — because the container is just mounted as a filesystem path, AMS has no way to detect if the mount drops or goes stale mid-stream; it just keeps writing to whatever's at that path. Confirm the mount is still active with `mount | grep blobfuse` before assuming AMS itself is misbehaving.

## Need Help?

If the steps above don't resolve it, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
