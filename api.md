# API Documentation

This document provides detailed information about the API endpoints available in the VSSBE project.

## Authentication

### User Login

- **Method**: `POST`
- **Path**: `/vss/user/apiLogin.action`
- **Description**: Authenticates a user and returns a token.

**Query Parameters:**

| Parameter | Type   | Description      |
| --------- | ------ | ---------------- |
| `username`| `string` | The user's name. |
| `password`| `string` | The user's password. |

**Example Request:**

`/vss/user/apiLogin.action?username=your_username&password=your_password`

### User Logout

- **Method**: `POST`
- **Path**: `/vss/user/apiLogout.action`
- **Description**: Logs out a user.

**Request Body:**

| Parameter | Type   | Description      |
| --------- | ------ | ---------------- |
| `username`| `string` | The user's name. |
| `token`   | `string` | The session token. |

**Example Request:**

```json
{
  "username": "your_username",
  "token": "your_session_token"
}
```

## Device Management

### Add Device

- **Method**: `POST`
- **Path**: `/vss/vehicle/apiAddDevice.action`
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

```json
{
  "deviceID": "device123",
  "deviceName": "My GPS Tracker",
  "deviceType": "GPS",
  "channelName": "Channel 1",
  "token": "your_session_token",
  "nodeGuid": "guid123"
}
```

### Modify Device

- **Method**: `POST`
- **Path**: `/vss/vehicle/apiModifyDevice.action`
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

```json
{
  "deviceID": "device123",
  "deviceName": "New Device Name",
  "channelName": "New Channel Name",
  "deviceType": "New Type",
  "token": "your_session_token"
}
```

### Remove Device

- **Method**: `POST`
- **Path**: `/vss/vehicle/apiRemoveDevice.action`
- **Description**: Removes a device.

**Request Body:**

| Parameter  | Type     | Description           |
| ---------- | -------- | --------------------- |
| `deviceID` | `string` | The ID of the device. |
| `token`    | `string` | The session token.    |

**Example Request:**

```json
{
  "deviceID": "device123",
  "token": "your_session_token"
}
```

## Device Status & GPS

### Query Device Status

- **Method**: `POST`
- **Path**: `/vss/onoffline/queryMoreDeviceStatus.action`
- **Description**: Queries the status of one or more devices.

**Request Body:**

| Parameter  | Type     | Description           |
| ---------- | -------- | --------------------- |
| `deviceID` | `string` | The ID of the device. |
| `token`    | `string` | The session token.    |

**Example Request:**

```json
{
  "deviceID": "device123",
  "token": "your_session_token"
}
```

### Get Track List

- **Method**: `POST`
- **Path**: `/vss/track/getApiTrackList.action`
- **Description**: Retrieves the track list for a device within a time range.

**Request Body:**

| Parameter   | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `deviceID`  | `string` | The ID of the device.           |
| `pageNum`   | `number` | The page number.                |
| `pageCount` | `number` | The number of items per page.   |
| `beginTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```json
{
  "token": "your_session_token",
  "deviceID": "device123",
  "pageNum": 1,
  "pageCount": 10,
  "beginTime": "2025-08-22 00:00:00",
  "endTime": "2025-08-22 23:59:59"
}
```

### Find All

- **Method**: `POST`
- **Path**: `/vss/onoffline/apiFindAll.action`
- **Description**: Finds all device data within a time range.

**Request Body:**

| Parameter   | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `pageNum`   | `number` | The page number.                |
| `pageCount` | `number` | The number of items per page.   |
| `deviceID`  | `string` | The ID of the device.           |
| `beginTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```json
{
  "token": "your_session_token",
  "pageNum": 1,
  "pageCount": 10,
  "deviceID": "device123",
  "beginTime": "2025-08-22 00:00:00",
  "endTime": "2025-08-22 23:59:59"
}
```

## Video & File Management

### Video File Search

- **Method**: `POST`
- **Path**: `/vss/record/videoFileSearch.action`
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

```json
{
  "token": "your_session_token",
  "deviceID": "device123",
  "startTime": "2025-08-22 00:00:00",
  "endTime": "2025-08-22 23:59:59",
  "channelList": "1,2,3",
  "fileType": "mp4",
  "location": "cloud"
}
```

### Insert Web Down Record

- **Method**: `POST`
- **Path**: `/vss/vss/webdownrecord/insert.action`
- **Description**: Inserts a web download record.

**Request Body:**

| Parameter      | Type     | Description                |
| -------------- | -------- | -------------------------- |
| `token`        | `string` | The session token.         |
| `username`     | `string` | The user's name.           |
| `resStartTime` | `string` | The resource start time.   |
| `resEndTime`   | `string` | The resource end time.     |
| `deviceNo`     | `string` | The device number.         |
| `channel`      | `string` | The channel number.        |
| `fileFormat`   | `string` | The format of the file.    |

**Example Request:**

```json
{
  "token": "your_session_token",
  "username": "your_username",
  "resStartTime": "2025-08-22 00:00:00",
  "resEndTime": "2025-08-22 23:59:59",
  "deviceNo": "device123",
  "channel": "1",
  "fileFormat": "mp4"
}
```

## Geofence

### Add Geofence

- **Method**: `POST`
- **Path**: `/vss/geofence/apiAddGeofence.action`
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

```json
{
  "token": "your_session_token",
  "name": "My Geofence",
  "coordinates": "-6.200000,106.816666",
  "type": "circle",
  "radius": 100
}
```

## Driver Management

### Add Driver

- **Method**: `POST`
- **Path**: `/vss/driver/apiAddDriver.action`
- **Description**: Adds a new driver.

**Request Body:**

| Parameter    | Type     | Description              |
| ------------ | -------- | ------------------------ |
| `token`      | `string` | The session token.       |
| `driverName` | `string` | The name of the driver.  |
| `fleetID`    | `string` | The ID of the fleet.     |

**Example Request:**

```json
{
  "token": "your_session_token",
  "driverName": "John Doe",
  "fleetID": "fleet123"
}
```

## Traffic Consumption

### Consume Record

- **Method**: `POST`
- **Path**: `/vss/traffic/consumeRecord.action`
- **Description**: Records traffic consumption.

**Request Body:**

| Parameter   | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| `token`     | `string` | The session token.              |
| `deviceID`  | `string` | The ID of the device.           |
| `startTime` | `string` | The start time (e.g., `YYYY-MM-DD HH:MM:SS`). |
| `endTime`   | `string` | The end time (e.g., `YYYY-MM-DD HH:MM:SS`).   |

**Example Request:**

```json
{
  "token": "your_session_token",
  "deviceID": "device123",
  "startTime": "2025-08-22 00:00:00",
  "endTime": "2025-08-22 23:59:59"
}
```
