---
title: User Defined Scripts
description: There are a few scripts to help you to automate Ant Media Instance, like MP4 muxing(recording), MP4 Muxing script usage instructions, VoD upload finish process, and VoD Upload script usage instructions.
keywords: [MP4 muxing, MP4 recording, VoD Upload script, MP4 Muxing script usage instructions, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 9
---

# User Defined Scripts

User-defined scripts run automatically after Ant Media Server finishes MP4 muxing (recording) or a VoD upload, so you can act on the resulting file without any manual step. This reference covers the two hook points AMS provides, plus four ready-to-use scripts built on them: transcoding a VoD once instead of paying for adaptive bitrate on the fly, converting an uploaded VoD to HLS, stripping video from a recording, and auto-uploading manually-added VoDs to S3.

There's no real limit to what a hook script can do — these are just the common cases. Both hooks are called after every matching recording or upload finishes.

## MP4 Muxing Finish Process

Runs after the MP4 muxing (recording) process finishes.

### Define the Script Location in App Settings

You can set up a custom post-processing script for MP4 recordings directly from the Advanced Settings in the Ant Media Web Panel.

1. Log into the Ant Media Server Web Panel (`http://<DOMAIN_NAME>:5080`).
2. Navigate to Applications, select your app (e.g., `live`), and go to Advanced Settings.
3. Locate the **muxerFinishScript** field and enter the script path (e.g., `/path/to/scriptFile.sh`).
4. Save the settings.

For example, if the script lives at `/usr/local/antmedia`, the setting looks like:

```js
"muxerFinishScript": "/usr/local/antmedia/scriptFile.sh",
```

The script needs executable permission:

```shell
chmod +x scriptFile.sh
```

See [settings.muxerFinishScript](/guides/configuration-and-testing/ams-application-configuration) for the full setting reference.

### Script Usage

After muxing finishes, AMS runs the script as:

```shell
<SCRIPT_PATH> <FULL_PATH_OF_MP4_FILE>
```

Example:

```
~/test_script.sh /usr/local/antmedia/webapps/live/streams/test_stream.mp4
```

On success, AMS logs:

```
running muxer finish script: ~/test_script.sh /usr/local/antmedia/webapps/live/streams/test_stream.mp4
```

## VoD Upload Finish Process

Runs after a VoD upload finishes.

### Define the Script Location in App Settings

Configure a custom post-processing script for VoD uploads the same way, from Advanced Settings in the Web Panel.

1. Log in to the Ant Media Server Web Panel (`http://<DOMAIN_NAME>:5080`).
2. Navigate to Applications, select your app (e.g., `live`), and go to Advanced Settings.
3. Locate the **vodUploadFinishScript** field and enter the script path.
4. Save the settings.

```js
"vodUploadFinishScript": "/usr/local/antmedia/scriptFile.sh",
```

```shell
chmod +x scriptFile.sh
```

See [settings.vodUploadFinishScript](/guides/configuration-and-testing/ams-application-configuration) for the full setting reference.

### Script Usage

After the VoD upload finishes, AMS runs the script the same way:

```shell
<SCRIPT_PATH> <FULL_PATH_OF_MP4_FILE>
```

Example:

```
~/test_script.sh /usr/local/antmedia/webapps/live/streams/test_stream.mp4
```

On success, AMS logs:

```
running muxer finish script: ~/test_script.sh /usr/local/antmedia/webapps/live/streams/test_stream.mp4
```

## Transcode an Uploaded VoD to HLS Without Broadcasting

To convert an uploaded VoD into HLS at multiple bitrates:

1. Download the transcoding script:

   ```bash
   wget https://raw.githubusercontent.com/ant-media/Scripts/master/vod_transcode.sh
   ```

2. Make it executable:

   ```bash
   chmod +x vod_transcode.sh
   ```

3. By default, the script transcodes to 240p, 480p, and 720p, storing output under `/usr/local/antmedia/webapps/<APP_NAME>/streams/` — adjust resolutions and the output directory in the script as needed.

4. Trigger it after every VoD upload by setting:

   ```
   "vodUploadFinishScript"="/script-directory-path/vod_transcode.sh"
   ```

5. Upload a VoD file. The script transcodes it to HLS automatically and saves it to the target directory.

6. In that directory, you'll find a master `.m3u8` file plus one per resolution. Play the HLS stream at:

   ```
   https://<DOMAIN_NAME>:5443/<APP_NAME>/<TARGET_DIRECTORY>/<VOD_ID>.m3u8
   ```

## Strip Video from a Recording

Keep the audio track only, by stripping video from a recording once it finishes.

1. Create the script at `/home/ubuntu/removevideo.sh`:

   ```bash
   #!/bin/bash
   # Removes video from the recorded file and saves it back under the same name.

   # Change this to your Ant Media Server application name.
   AMS_APP_NAME="live"

   file="$1"
   temp_file="${file%.mp4}_temp.mp4"

   cd /usr/local/antmedia/webapps/$AMS_APP_NAME/streams/

   ffmpeg -i "$file" -c copy -vn "$temp_file"
   mv "$temp_file" "$file"
   ```

2. Make it executable:

   ```bash
   sudo chmod +x /home/ubuntu/removevideo.sh
   ```

3. In the AMS Web Panel, go to your application's Advanced Settings and set:

   ```
   "muxerFinishScript": "/home/ubuntu/removevideo.sh"
   ```

4. Publish and stop a stream. The script runs automatically once the stream stops.

5. Confirm it worked — you should see a log entry like:

   ```
   2024-07-02 20:53:29,777 [vert.x-worker-thread-86] INFO i.a.AntMediaApplicationAdapter - completing script: /home/ubuntu/removevideo.sh /usr/local/antmedia/webapps/live/streams/test.mp4 with return value 0
   ```

   The resulting MP4 file should now contain audio only.

## Automatically Upload Manually-Added VoDs to S3

With [Cloud Storage Integration](/category/s3-recording-and-integration) enabled, AMS uploads *recorded* VoDs to your bucket automatically — but VoD files you add manually aren't uploaded the same way. This script closes that gap.

1. Install FFmpeg:

   ```bash
   sudo apt-get update && sudo apt-get install ffmpeg -y
   ```

2. Save the following as `/usr/local/antmedia/vod-upload-s3.sh`, filling in your own AWS credentials and bucket name:

   ```bash
   #!/bin/bash
   # Installation:
   #   apt-get update && apt-get install ffmpeg -y
   #   vim <AMS_DIR>/webapps/<APP_NAME>/WEB-INF/red5-web.properties
   #   settings.vodUploadFinishScript=<SCRIPT_DIR>/vod-upload-s3.sh
   #   sudo service antmedia restart

   # Install the AWS CLI if it isn't already present.
   if [ -z "$(which aws)" ]; then
       rm -r aws* > /dev/null 2>&1
       echo "Installing AWS CLI..."
       curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" > /dev/null 2>&1
       unzip awscliv2.zip > /dev/null 2>&1
       sudo ./aws/install
       echo "AWS CLI installed."
       rm -r aws*
   fi

   DELETE_LOCAL_FILE="Y"
   AWS_ACCESS_KEY="<AWS_ACCESS_KEY>"
   AWS_SECRET_KEY="<AWS_SECRET_KEY>"
   AWS_REGION="<AWS_REGION>"
   AWS_BUCKET_NAME="<AWS_BUCKET_NAME>"

   aws configure set aws_access_key_id $AWS_ACCESS_KEY
   aws configure set aws_secret_access_key $AWS_SECRET_KEY
   aws configure set region $AWS_REGION
   aws configure set output json

   tmpfile=$1
   mv $tmpfile "${tmpfile%.*}.mp4_tmp"
   ffmpeg -i "${tmpfile%.*}.mp4_tmp" -c copy -map 0 -movflags +faststart $tmpfile
   rm "${tmpfile%.*}.mp4_tmp"

   aws s3 cp $tmpfile s3://$AWS_BUCKET_NAME/streams/ --acl public-read

   if [ $? != 0 ]; then
       logger "$tmpfile failed to copy file to S3."
   else
       if [ "$DELETE_LOCAL_FILE" == "Y" ]; then
           aws s3api head-object --bucket $AWS_BUCKET_NAME --key streams/$(basename $tmpfile)
           if [ $? == 0 ]; then
               rm -rf $tmpfile
               logger "$tmpfile deleted."
           fi
       fi
   fi
   ```

3. Make it executable:

   ```bash
   sudo chmod +x /usr/local/antmedia/vod-upload-s3.sh
   ```

4. In the AMS Web Panel, go to Applications → Advanced Settings and set:

   ```
   "vodUploadFinishScript": "/usr/local/antmedia/vod-upload-s3.sh"
   ```

5. Restart Ant Media Server:

   ```bash
   sudo service antmedia restart
   ```

6. Upload a VoD file to test — it should transcode and land in the configured S3 bucket automatically.

These hooks cover the common post-recording and post-upload automation needs; from here, [Cloud Storage Integration](/category/s3-recording-and-integration) and [HTTP Forwarding](/guides/recording-live-streams/http-forwarding/) cover the rest of the recording-to-storage pipeline.

## Need Help?

If a script isn't triggering, confirm it has executable permission and that the application was restarted after saving the setting, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
