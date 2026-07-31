---
title: S3 Upload Record Type
description: Uploading file type to S3 storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to cloud storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 9
---

# S3 Upload Record Type

By default, when S3 Recording is enabled, Ant Media Server uploads every recording file type — HLS segments, MP4/WebM, and PNG previews — to your bucket. If you only want some of those file types uploaded (for example, recording in MP4 but not pushing HLS segments to S3), control it with the `uploadExtensionsToS3` application property, set from **Advanced Settings** in the web panel.

## How the Value Works

`uploadExtensionsToS3` is a bitmask: the least significant bit controls MP4/WebM, the next bit controls HLS, and the third bit controls PNG. Add up the bits for the file types you want uploaded.

| Value | Binary | Uploads |
| --- | --- | --- |
| `0` | `000` | Nothing |
| `1` | `001` | MP4/WebM only |
| `2` | `010` | HLS only |
| `3` | `011` | MP4/WebM and HLS |
| `4` | `100` | PNG only |
| `5` | `101` | MP4/WebM and PNG |
| `6` | `110` | HLS and PNG |
| `7` | `111` | Everything (default) |

For example, `uploadExtensionsToS3=5` uploads MP4/WebM and PNG but not HLS.

For more on HLS recording specifically, see [HLS Recording](/guides/recording-live-streams/hls-recording/).

## Need Help?

If files you expect to see in the bucket aren't uploading, confirm `uploadExtensionsToS3` includes the bit for that file type, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
