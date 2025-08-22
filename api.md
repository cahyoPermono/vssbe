# API Documentation

This document provides detailed information about the API endpoints available in the VSSBE project.

## General

### Root Route

- **Method**: `GET`
- **Path**: `/`
- **Description**: Checks if the VSS BE Proxy is running.

**Example Request:**

```bash
curl -X GET http://localhost:3000/
```

## Authentication

### User Login

- **Method**: `POST`
- **Path**: `/user/apiLogin.action`
- **Description**: Authenticates a user and returns a token.

**Query Parameters:**

| Parameter | Type   | Description      |
| --------- | ------ | ---------------- |
| `username`| `string` | The user's name. |
| `password`| `string` | The user's password. |

**Example Request:**

```bash
curl -X POST "http://localhost:3000/vss/user/apiLogin.action?username=imaniprima&password=a95cf0e4d562a9055b2643e9d7abacc0"

```

### User Logout

- **Method**: `POST`
- **Path**: `/user/apiLogout.action`
- **Description**: Logs out a user.

**Request Body:**

| Parameter | Type   | Description      |
| --------- | ------ | ---------------- |
| `username`| `string` | The user's name. |
| `token`   | `string` | The session token. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/user/apiLogout.action \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "token": "your_session_token"
  }'
```

## Device Management

### Add Device

- **Method**: `POST`
- **Path**: `/vehicle/apiAddDevice.action`
- **Description**: Adds a new device.

**Request Body:**

| Parameter     | Type     | Description                |
| ------------- | -------- | -------------------------- |
| `deviceID`    | `string` | The ID of the device.      |
| `deviceName`  | `string` | The name of the device.    |
| `deviceType`  | `string` | The type of the device.    |
| `channelName` | `string` | The name of the channel.   |
| `token`       | `string` | The session token.         |
| `nodeGuid`    | `string` | The GUID of the node.      |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vehicle/apiAddDevice.action \
  -H "Content-Type: application/json" \
  -d '{
    "deviceID": "device123",
    "deviceName": "My GPS Tracker",
    "deviceType": "GPS",
    "channelName": "Channel 1",
    "token": "your_session_token",
    "nodeGuid": "guid123"
  }'
```

### Modify Device

- **Method**: `POST`
- **Path**: `/vehicle/apiModifyDevice.action`
- **Description**: Modifies an existing device.

**Request Body:**

| Parameter     | Type     | Description              |
| ------------- | -------- | ------------------------ |
| `deviceID`    | `string` | The ID of the device.    |
| `deviceName`  | `string` | The new name of the device. |
| `channelName` | `string` | The new name of the channel.|
| `deviceType`  | `string` | The new type of the device. |
| `token`       | `string` | The session token.       |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vehicle/apiModifyDevice.action \
  -H "Content-Type: application/json" \
  -d '{
    "deviceID": "device123",
    "deviceName": "New Device Name",
    "channelName": "New Channel Name",
    "deviceType": "New Type",
    "token": "your_session_token"
  }'
```

### Remove Device

- **Method**: `POST`
- **Path**: `/vehicle/apiRemoveDevice.action`
- **Description**: Removes a device.

**Request Body:**

| Parameter  | Type     | Description           |
| ---------- | -------- | --------------------- |
| `deviceID` | `string` | The ID of the device. |
| `token`    | `string` | The session token.    |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vehicle/apiRemoveDevice.action \
  -H "Content-Type: application/json" \
  -d '{
    "deviceID": "device123",
    "token": "your_session_token"
  }'
```

### Find All Vehicles

- **Method**: `POST`
- **Path**: `/vehicle/findAll.action`
- **Description**: Retrieves a list of all vehicles.

**Request Body:**

| Parameter   | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `isOnline`  | `boolean`| Filter by online status.        |
| `pageCount` | `number` | The number of items per page.   |
| `pageNum`   | `number` | The page number.                |
| `keyword`   | `string` | Keyword for searching vehicles. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vehicle/findAll.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "isOnline": true,
    "pageCount": 10,
    "pageNum": 1,
    "keyword": ""
  }'
```

## Driver Management

### Add Driver

- **Method**: `POST`
- **Path**: `/driver/apiAddDriver.action`
- **Description**: Adds a new driver.

**Request Body:**

| Parameter    | Type     | Description              |
| ------------- | -------- | ------------------------ |
| `token`      | `string` | The session token.       |
| `driverName` | `string` | The name of the driver.  |
| `fleetID`    | `string` | The ID of the fleet.     |

**Example Request:**

```bash
curl -X POST http://localhost:3000/driver/apiAddDriver.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "driverName": "John Doe",
    "fleetID": "fleet123"
  }'
```

## Geofence

### Add Geofence

- **Method**: `POST`
- **Path**: `/geofence/apiAddGeofence.action`
- **Description**: Adds a new geofence.

**Request Body:**

| Parameter     | Type     | Description                |
| ------------- | -------- | -------------------------- |
| `token`       | `string` | The session token.         |
| `name`        | `string` | The name of the geofence.  |
| `coordinates` | `string` | The coordinates of the geofence. |
| `type`        | `string` | The type of the geofence.  |
| `radius`      | `number` | The radius of the geofence.|

**Example Request:**

```bash
curl -X POST http://localhost:3000/geofence/apiAddGeofence.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "name": "My Geofence",
    "coordinates": "-6.200000,106.816666",
    "type": "circle",
    "radius": 100
  }'
```

## On/Offline Status

### Query More Device Status

- **Method**: `POST`
- **Path**: `/onoffline/queryMoreDeviceStatus.action`
- **Description**: Queries the status of one or more devices.

**Request Body:**

| Parameter  | Type     | Description           |
| ---------- | -------- | --------------------- |
| `deviceID` | `string` | The ID of the device. |
| `token`    | `string` | The session token.    |

**Example Request:**

```bash
curl -X POST http://localhost:3000/onoffline/queryMoreDeviceStatus.action \
  -H "Content-Type: application/json" \
  -d '{
    "deviceID": "device123",
    "token": "your_session_token"
  }'
```

### Find All On/Offline Records

- **Method**: `POST`
- **Path**: `/onoffline/apiFindAll.action`
- **Description**: Finds all device data within a time range.

**Request Body:**

| Parameter   | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `pageNum`   | `number` | The page number.                |
| `pageCount` | `number` | The number of items per page.   |
| `deviceID`  | `string` | The ID of the device.           |
| `beginTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```bash
curl -X POST http://localhost:3000/onoffline/apiFindAll.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "pageNum": 1,
    "pageCount": 10,
    "deviceID": "device123",
    "beginTime": "2025-08-22 00:00:00",
    "endTime": "2025-08-22 23:59:59"
  }'
```

### Find All VSS On/Offline Records

- **Method**: `POST`
- **Path**: `/vss/onoffline/apiFindAll.action`
- **Description**: Finds all VSS on/offline records.

**Request Body:**

| Parameter   | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `pageNum`   | `number` | The page number.                |
| `pageCount` | `number` | The number of items per page.   |
| `deviceID`  | `string` | The ID of the device.           |
| `beginTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/onoffline/apiFindAll.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "pageNum": 1,
    "pageCount": 10,
    "deviceID": "device123",
    "beginTime": "2025-08-22 00:00:00",
    "endTime": "2025-08-22 23:59:59"
  }'
```

## Passenger Records

### Passenger Record Detail

- **Method**: `POST`
- **Path**: `/vss/passengerrecord/detail.action`
- **Description**: Retrieves detailed passenger records.

**Request Body:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `token`   | `string` | The session token. |
| `recordId`| `string` | The ID of the passenger record. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/passengerrecord/detail.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "recordId": "record123"
  }'
```

### Passenger Record Statistics

- **Method**: `POST`
- **Path**: `/vss/passengerrecord/statistics.action`
- **Description**: Retrieves statistics for passenger records.

**Request Body:**

| Parameter   | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `beginTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/passengerrecord/statistics.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "beginTime": "2025-08-22 00:00:00",
    "endTime": "2025-08-22 23:59:59"
  }'
```

## Track Management

### Get API Track List

- **Method**: `POST`
- **Path**: `/track/getApiTrackList.action`
- **Description**: Retrieves the track list for a device within a time range.

**Request Body:**

| Parameter   | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `deviceID`  | `string` | The ID of the device.           |
| `pageNum`   | `number` | The page number.                |
| `pageCount` | `number` | The number of items per page.   |
| `beginTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```bash
curl -X POST http://localhost:3000/track/getApiTrackList.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "deviceID": "device123",
    "pageNum": 1,
    "pageCount": 10,
    "beginTime": "2025-08-22 00:00:00",
    "endTime": "2025-08-22 23:59:59"
  }'
```

### Get VSS Track List

- **Method**: `POST`
- **Path**: `/vss/track/getTrackList.action`
- **Description**: Retrieves the VSS track list.

**Request Body:**

| Parameter   | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `deviceID`  | `string` | The ID of the device.           |
| `beginTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/track/getTrackList.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "deviceID": "device123",
    "beginTime": "2025-08-22 00:00:00",
    "endTime": "2025-08-22 23:59:59"
  }'
```

### Get VSS API Track List

- **Method**: `POST`
- **Path**: `/vss/track/getApiTrackList.action`
- **Description**: Retrieves the VSS API track list.

**Request Body:**

| Parameter   | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `deviceID`  | `string` | The ID of the device.           |
| `pageNum`   | `number` | The page number.                |
| `pageCount` | `number` | The number of items per page.   |
| `beginTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/track/getApiTrackList.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "deviceID": "device123",
    "pageNum": 1,
    "pageCount": 10,
    "beginTime": "2025-08-22 00:00:00",
    "endTime": "2025-08-22 23:59:59"
  }'
```

## Traffic Consumption

### Consume Record

- **Method**: `POST`
- **Path**: `/traffic/consumeRecord.action`
- **Description**: Records traffic consumption.

**Request Body:**

| Parameter   | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `deviceID`  | `string` | The ID of the device.           |
| `startTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```bash
curl -X POST http://localhost:3000/traffic/consumeRecord.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "deviceID": "device123",
    "startTime": "2025-08-22 00:00:00",
    "endTime": "2025-08-22 23:59:59"
  }'
```

## Vehicle Management

### Get Vehicle Setting

- **Method**: `POST`
- **Path**: `/vss/vehicle/getVehicleSetting.action`
- **Description**: Retrieves vehicle settings.

**Request Body:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `token`   | `string` | The session token. |
| `vehicleId`| `string` | The ID of the vehicle. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/vehicle/getVehicleSetting.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "vehicleId": "vehicle123"
  }'
```

### API Vehicle Setting

- **Method**: `POST`
- **Path**: `/vss/vehicle/apiVehicleSetting.action`
- **Description**: Sets vehicle API settings.

**Request Body:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `token`   | `string` | The session token. |
| `vehicleId`| `string` | The ID of the vehicle. |
| `setting` | `object` | The settings object. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/vehicle/apiVehicleSetting.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "vehicleId": "vehicle123",
    "setting": {
      "key": "value"
    }
  }'
```

## Video & File Management

### Video File Search

- **Method**: `POST`
- **Path**: `/record/videoFileSearch.action`
- **Description**: Searches for video files.

**Request Body:**

| Parameter     | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `token`       | `string` | The session token.              |
| `deviceID`    | `string` | The ID of the device.           |
| `startTime`   | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`     | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |
| `channelList` | `string` | A comma-separated list of channels. |
| `fileType`    | `string` | The type of the file.           |
| `location`    | `string` | The location.                   |

**Example Request:**

```bash
curl -X POST http://localhost:3000/record/videoFileSearch.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "deviceID": "device123",
    "startTime": "2025-08-22 00:00:00",
    "endTime": "2025-08-22 23:59:59",
    "channelList": "1,2,3",
    "fileType": "mp4",
    "location": "cloud"
  }'
```

### Insert Web Down Record

- **Method**: `POST`
- **Path**: `/vss/webdownrecord/insert.action`
- **Description**: Inserts a web download record.

**Request Body:**

| Parameter      | Type     | Description                |
| ------------- | -------- | -------------------------- |
| `token`        | `string` | The session token.         |
| `username`     | `string` | The user's name.           |
| `resStartTime` | `string` | The resource start time.   |
| `resEndTime`   | `string` | The resource end time.     |
| `deviceNo`     | `string` | The device number.         |
| `channel`      | `string` | The channel number.        |
| `fileFormat`   | `string` | The format of the file.    |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/webdownrecord/insert.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "username": "your_username",
    "resStartTime": "2025-08-22 00:00:00",
    "resEndTime": "2025-08-22 23:59:59",
    "deviceNo": "device123",
    "channel": "1",
    "fileFormat": "mp4"
  }'
```

## Voice Management

### Add Voice File

- **Method**: `POST`
- **Path**: `/vss/voice/addVoiceFile.action`
- **Description**: Adds a new voice file.

**Request Body:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `token`   | `string` | The session token. |
| `fileName`| `string` | The name of the voice file. |
| `fileContent`| `string` | Base64 encoded content of the voice file. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/voice/addVoiceFile.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "fileName": "greeting.mp3",
    "fileContent": "base64_encoded_audio_content"
  }'
```

### Delete Voice File

- **Method**: `POST`
- **Path**: `/vss/voice/deleteVoiceFile.action`
- **Description**: Deletes a voice file.

**Request Body:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `token`   | `string` | The session token. |
| `fileId`  | `string` | The ID of the voice file to delete. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/voice/deleteVoiceFile.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "fileId": "file123"
  }'
```

### Update Voice File

- **Method**: `POST`
- **Path**: `/vss/voice/updateVoiceFile.action`
- **Description**: Updates an existing voice file.

**Request Body:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `token`   | `string` | The session token. |
| `fileId`  | `string` | The ID of the voice file to update. |
| `newFileName`| `string` | The new name for the voice file. |
| `newFileContent`| `string` | Base64 encoded new content of the voice file. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/voice/updateVoiceFile.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "fileId": "file123",
    "newFileName": "updated_greeting.mp3",
    "newFileContent": "base64_encoded_new_audio_content"
  }'
```

### Get Voice File

- **Method**: `POST`
- **Path**: `/vss/voice/getVoiceFile.action`
- **Description**: Retrieves a voice file.

**Request Body:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `token`   | `string` | The session token. |
| `fileId`  | `string` | The ID of the voice file to retrieve. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/voice/getVoiceFile.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "fileId": "file123"
  }'
```

### Issue Voice File

- **Method**: `POST`
- **Path**: `/vss/voice/issueVoiceFile.action`
- **Description**: Issues a voice file.

**Request Body:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `token`   | `string` | The session token. |
| `fileId`  | `string` | The ID of the voice file to issue. |
| `deviceId`| `string` | The ID of the device to issue the voice file to. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/voice/issueVoiceFile.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "fileId": "file123",
    "deviceId": "device123"
  }'
```

### Open Voice

- **Method**: `POST`
- **Path**: `/vss/voice/openVoice.action`
- **Description**: Opens voice communication.

**Request Body:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `token`   | `string` | The session token. |
| `deviceId`| `string` | The ID of the device to open voice with. |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/voice/openVoice.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "deviceId": "device123"
  }'
```

## Alarm Management

### Find All Alarms by Time

- **Method**: `POST`
- **Path**: `/vss/alarm/apiFindAllByTime.action`
- **Description**: Retrieves all alarms within a specified time range.

**Request Body:**

| Parameter   | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `beginTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```bash
curl -X POST http://localhost:3000/vss/alarm/apiFindAllByTime.action \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_session_token",
    "beginTime": "2025-08-22 00:00:00",
    "endTime": "2025-08-22 23:59:59"
  }'
```