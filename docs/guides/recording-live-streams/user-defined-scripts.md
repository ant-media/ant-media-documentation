---
title: User Defined Scripts
description: There are a few scripts to help you to automate Ant Media Instance, like MP4 muxing(recording), MP4 Muxing script usage instructions, VoD upload finish process, and VoD Upload script usage instructions.
keywords: [MP4 muxing, MP4 recording, VoD Upload script, MP4 Muxing script usage instructions, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# User Defined Scripts

User-defined scripts are run automatically by the Ant Media Server after the MP4 Muxing process (recording) finishes or the VoD upload process finishes. It enables users to make some changes on the mp4 file. A few examples:

1) Creating different resolutions for VoD serving ( Using adaptive bitrate on the fly will spend more resources; you can transcode once for each VoD with your own user-defined script after every muxing operation)

2) Merging VoDs with ffmpeg

3) Adding some watermark to VoDs after the stream is saved.

You can get creative with user-defined scripts; there are no limits. They are called after each stream recording process or each VoD upload process is finished.

MP4 muxing(recording) finish process
------------------------------------

 It will work after the MP4 Muxing(recording) process finishes. Let’s have a look at that step by step.

1.  [Define run script location in App Settings](#define-mp4-muxing)
2.  [Script running instructions](#mp4-muxing-script)

### Define MP4 muxing run script location in App Settings

You can set up a custom post-processing script for MP4 recordings directly from the Advanced Settings in the Ant Media Web Panel. 
To do this:
1. Log into the Ant Media Server Web Panel (http://YOUR_SERVER_IP:5080)
2. Navigate to Applications, select your app (LiveApp, WebRTCAppEE, etc.), go to Advanced Settings
3. Locate the MP4 **muxerFinishScript** field and enter the script path (e.g., /path/to/scriptFile.sh).
4. Finally, save the settings.

Usage:

- For example, if the script is located at /usr/local/antmedia, then the setting would be as follows:

  ```js
  "muxerFinishScript": "/usr/local/antmedia/scriptFile.sh",
  ```

- The script should have executable permission

  Mark the file as executable with code below:

  ```shell
  chmod +x scriptFile.sh
  ```

Setting References: [settings.muxerFinishScript Setting](/guides/configuration-and-testing/ams-application-configuration)

### MP4 Muxing script usage instructions

After the muxing process is finished, the AMS runs the following code snippets.

```shell
scriptFilePath fullPathOfMP4File
```

Example:

```
~/test_script.sh /usr/local/antmedia/webapps/LiveApp/streams/test_stream.mp4
```

When the script is successfully finished, AMS writes in the INFO log as below:

```
running muxer finish script: ~/test_script.sh /usr/local/antmedia/webapps/LiveApp/streams/test_stream.mp4
```


## VoD upload finish process

It will work after the VoD upload process finishes. Let’s have a look at that step by step.

1.  [Define run script location in App Settings](#define-vod-upload)
2.  [Script running instructions](#vod-upload-script)

### Define VoD upload run script location in App Settings

You can configure a custom post-processing script for VOD uploads directly from the Advanced Settings in the Ant Media Web Panel.
To do this:
1. Log in to the Ant Media Server Web Panel (http://YOUR_SERVER_IP:5080)
2. Navigate to Applications, select your app (LiveApp, WebRTCAppEE, etc.), go to Advanced Settings
3. Locate the **vodUploadFinishScript** field and enter the script path (e.g., /path/to/scriptFile.sh).
4. Finally, save the settings.

Usage:

- For example, if the script is located at /usr/local/antmedia, then the setting would be as follows:

```js
"vodUploadFinishScript": "/usr/local/antmedia/scriptFile.sh",
```

- The script should have executable permission.

  Mark the file as executable with code below:

  ```shell
  chmod +x scriptFile.sh
  ```

Setting References: [settings.vodUploadFinishScript Setting](/guides/configuration-and-testing/ams-application-configuration)

### VoD Upload script usage instructions

After the VoD upload process is finished, the AMS runs the following code snippets.

```
scriptFilePath fullPathOfMP4File
```

Example:
```
~/test_script.sh /usr/local/antmedia/webapps/LiveApp/streams/test_stream.mp4
```

When the script finishes successfully, AMS writes in the INFO log as below:
```
running muxer finish script: ~/test_script.sh /usr/local/antmedia/webapps/LiveApp/streams/test_stream.mp4
```



## Transcode and Play uploaded VoD files as HLS in AMS without Broadcasting.

To convert uploaded VOD to HLS with different bitrates, please follow the below steps:

### 1. Download the VOD-to-HLS Transcoding Script
Use the following command to download the script onto your server:
```
wget https://raw.githubusercontent.com/ant-media/Scripts/master/vod_transcode.sh
```

### 2. Grant Execute Permissions
After downloading, provide execute permission to the script with this command:
```
chmod +x vod_transcode.sh
``` 

### 3. Default Transcoding Settings
By default, the script transcodes to 240p, 480p, and 720p resolutions, with the output stored in the following directory. You can adjust the resolutions and directory as needed:
```
/usr/local/antmedia/webapps/WebRTCAppEE/streams/
```

### 4. Configure VOD Upload Script
Update the advanced settings of your application by adding the following line to trigger the script after VOD uploads:
```
"vodUploadFinishScript"="/script-directory-path/vod_transcode.sh"
```

### 5. Upload a VOD File
Upload your VOD file to the configured application. The script will automatically transcode it into HLS format and save it in your target directory.

### 6. Access the Transcoded HLS Files
In the target directory, you’ll find a **master M3U8 file** and **resolution-specific M3U8 files**. Use the following URL format to play the HLS stream:
```
https://domain:5443/app-name/target-directory/Vod_Id.m3u8
```



## Strip Video from a Stream Recording in Ant Media Server

### 1. Create the Script
   
**Location**:
```
/home/ubuntu/removevideo.sh
```
**Content**:
```
#create the bash script to remove video from the recorded file and save it with same id again

# Don't forget to change the Ant Media Server App Name
AMS_APP_NAME="LiveApp"

file="$1"
temp_file="${file%.mp4}_temp.mp4"

cd /usr/local/antmedia/$AMS_APP_NAME/LiveApp/streams/

# Add metadata using ffmpeg
ffmpeg -i "$file" -c copy -vn "$temp_file"

# Replace the original file with the new file
mv "$temp_file" "$file"
```

### 2. Grant Execute Permission
Make the script executable:
```
sudo chmod +x /home/ubuntu/removevideo.sh
```

### 3. Configure Ant Media Server
Access the AMS Web Management Console. Navigate to your application's Advanced Settings and locate the muxerFinishScript property.
```
"muxerFinishScript": "/home/ubuntu/removevideo.sh"
```

### 4. Publish and Stop a Stream:
- Use a tool or platform (e.g., OBS) to publish a stream to AMS.  
- Stop the stream.  
- Once stopped, the script will be triggered automatically.

### 5. Verify Script Execution:
If successful, you should see a log entry similar to:
```
2024-07-02 20:53:29,777 [vert.x-worker-thread-86] INFO i.a.AntMediaApplicationAdapter - completing script: /home/ubuntu/removevideo.sh  /usr/local/antmedia/webapps/LiveApp/streams/test.mp4 with return value 0
Verify the File: The original MP4 file should now only contain audio.
```


## Automatically Transfer VoD Files to S3 Using Ant Media Server
When S3 integration is enabled on AMS, recorded VODs are automatically uploaded to the S3 bucket. However, manually uploaded VOD files are not. You can use the script below to upload all VODs to S3.

### 1. Install FFmpeg on Ant Media Server (AMS)
Use the following commands to update your package list and install FFmpeg:
```
sudo apt-get update && sudo apt-get install ffmpeg -y
```

### 2. Save and Configure the Script
- **Download or Create the Script**
Save the following script as `vod-upload-s3.sh` under `/usr/local/antmedia/`
```
#!/bin/bash
#Installation Instructions
#apt-get update && apt-get install ffmpeg -y
#vim [AMS-DIR]/webapps/applications(LiveApp or etc.)/WEB-INF/red5-web.properties
#settings.vodUploadFinishScript=/Script-DIR/vod-upload-s3.sh
#sudo service antmedia restart

#Check if AWS CLI is installed
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
AWS_ACCESS_KEY=""
AWS_SECRET_KEY=""
AWS_REGION=""
AWS_BUCKET_NAME=""

# AWS Configuration
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
- **Set Execute Permissions**
Make the script executable by running:
```
sudo chmod +x /usr/local/antmedia/vod-upload-s3.sh
```
- **Add AWS Credentials**
Open the script and replace the placeholders for AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, and AWS_BUCKET_NAME with your AWS credentials and bucket details.

### 3. Configure Ant Media Server to Use the Script

- Open Ant Media Server's Web Panel.
- Go to Applications → Advanced Settings.
- Set the following property:
```
"vodUploadFinishScript": "/usr/local/antmedia/vod-upload-s3.sh"
```

### 4. Restart Ant Media Server
Restart the Ant Media Server to apply the changes:
```
sudo systemctl restart antmedia
```

### 5. Upload and Test VoD Files
Upload any VoD file to your application. The file will be automatically transcoded and uploaded to the specified S3 bucket.


