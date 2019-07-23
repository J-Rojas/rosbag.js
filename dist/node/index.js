(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rosbag"] = factory();
	else
		root["rosbag"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/node/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BagReader.js":
/*!**************************!*\
  !*** ./src/BagReader.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BagReader; });
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _nmerge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nmerge */ "./src/nmerge.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./record */ "./src/record.js");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




const HEADER_READAHEAD = 4096;
const HEADER_OFFSET = 13; // BagReader is a lower level interface for reading specific sections & chunks
// from a rosbag file - generally it is consumed through the Bag class, but
// can be useful to use directly for efficiently accessing raw pieces from
// within the bag

class BagReader {
  constructor(filelike) {
    _defineProperty(this, "_lastReadResult", void 0);

    _defineProperty(this, "_file", void 0);

    _defineProperty(this, "_lastChunkInfo", void 0);

    this._file = filelike;
    this._lastChunkInfo = undefined;
  }

  verifyBagHeader(callback, next) {
    this._file.read(0, HEADER_OFFSET, (error, buffer) => {
      if (error || !buffer) {
        return callback(error || new Error("Missing both error and buffer"));
      }

      if (this._file.size() < HEADER_OFFSET) {
        return callback(new Error("Missing file header."));
      }

      if (buffer.toString() !== "#ROSBAG V2.0\n") {
        return callback(new Error("Cannot identify bag format."));
      }

      next();
    });
  } // reads the header block from the rosbag file
  // generally you call this first
  // because you need the header information to call readConnectionsAndChunkInfo


  readHeader(callback) {
    this.verifyBagHeader(callback, () => {
      return this._file.read(HEADER_OFFSET, HEADER_READAHEAD, (error, buffer) => {
        if (error || !buffer) {
          return callback(error || new Error("Missing both error and buffer"));
        }

        const read = buffer.length;

        if (read < 8) {
          return callback(new Error(`Record at position ${HEADER_OFFSET} is truncated.`));
        }

        const headerLength = buffer.readInt32LE(0);

        if (read < headerLength + 8) {
          return callback(new Error(`Record at position ${HEADER_OFFSET} header too large: ${headerLength}.`));
        }

        const header = this.readRecordFromBuffer(buffer, HEADER_OFFSET, _record__WEBPACK_IMPORTED_MODULE_2__["BagHeader"]);
        return callback(null, header);
      });
    });
  } // promisified version of readHeader


  readHeaderAsync() {
    return new Promise((resolve, reject) => this.readHeader((err, header) => err || !header ? reject(err) : resolve(header)));
  } // reads connection and chunk information from the bag
  // you'll generally call this after reading the header so you can get
  // connection metadata and chunkInfos which allow you to seek to individual
  // chunks & read them


  readConnectionsAndChunkInfo(fileOffset, connectionCount, chunkCount, callback) {
    this._file.read(fileOffset, this._file.size() - fileOffset, (err, buffer) => {
      if (err || !buffer) {
        return callback(err || new Error("Missing both error and buffer"));
      }

      if (connectionCount === 0) {
        return callback(null, {
          connections: [],
          chunkInfos: []
        });
      }

      const connections = this.readRecordsFromBuffer(buffer, connectionCount, fileOffset, _record__WEBPACK_IMPORTED_MODULE_2__["Connection"]);
      const connectionBlockLength = connections[connectionCount - 1].end - connections[0].offset;
      const chunkInfos = this.readRecordsFromBuffer(buffer.slice(connectionBlockLength), chunkCount, fileOffset + connectionBlockLength, _record__WEBPACK_IMPORTED_MODULE_2__["ChunkInfo"]);

      if (chunkCount > 0) {
        for (let i = 0; i < chunkCount - 1; i++) {
          chunkInfos[i].nextChunk = chunkInfos[i + 1];
        }

        chunkInfos[chunkCount - 1].nextChunk = null;
      }

      return callback(null, {
        connections,
        chunkInfos
      });
    });
  } // promisified version of readConnectionsAndChunkInfo


  readConnectionsAndChunkInfoAsync(fileOffset, connectionCount, chunkCount) {
    return new Promise((resolve, reject) => {
      this.readConnectionsAndChunkInfo(fileOffset, connectionCount, chunkCount, (err, result) => err || !result ? reject(err) : resolve(result));
    });
  } // read individual raw messages from the bag at a given chunk
  // filters to a specific set of connection ids, start time, & end time
  // generally the records will be of type MessageData


  readChunkMessages(chunkInfo, connections, startTime, endTime, decompress, callback) {
    const start = startTime || {
      sec: 0,
      nsec: 0
    };
    const end = endTime || {
      sec: Number.MAX_VALUE,
      nsec: Number.MAX_VALUE
    };
    const conns = connections || chunkInfo.connections.map(connection => {
      return connection.conn;
    });
    this.readChunk(chunkInfo, decompress, (error, result) => {
      if (error || !result) {
        return callback(error || new Error("Missing both error and result"));
      }

      const chunk = result.chunk;
      const indices = {};
      result.indices.forEach(index => {
        indices[index.conn] = index;
      });
      const presentConnections = conns.filter(conn => {
        return indices[conn] !== undefined;
      });
      const iterables = presentConnections.map(conn => {
        // $FlowFixMe https://github.com/facebook/flow/issues/1163
        return indices[conn].indices[Symbol.iterator]();
      }); //messages should be merge by file offset so the messages are replayed in
      // their original order, similar to 'rosbag play'

      const iter = Object(_nmerge__WEBPACK_IMPORTED_MODULE_1__["default"])((a, b) => a.offset - b.offset, ...iterables);
      const entries = [];
      let item = iter.next();

      while (!item.done) {
        const {
          value
        } = item;
        item = iter.next();

        if (!value || _TimeUtil__WEBPACK_IMPORTED_MODULE_3__["isGreaterThan"](start, value.time)) {
          continue;
        }

        if (_TimeUtil__WEBPACK_IMPORTED_MODULE_3__["isGreaterThan"](value.time, end)) {
          break;
        }

        entries.push(value);
      }

      const messages = entries.map(entry => {
        return this.readRecordFromBuffer(chunk.data.slice(entry.offset), chunk.dataOffset, _record__WEBPACK_IMPORTED_MODULE_2__["MessageData"]);
      });
      return callback(null, messages);
    });
  } // promisified version of readChunkMessages


  readChunkMessagesAsync(chunkInfo, connections, startTime, endTime, decompress) {
    return new Promise((resolve, reject) => {
      this.readChunkMessages(chunkInfo, connections, startTime, endTime, decompress, (err, messages) => err || !messages ? reject(err) : resolve(messages));
    });
  } // reads a single chunk record && its index records given a chunkInfo


  readChunk(chunkInfo, decompress, callback) {
    // if we're reading the same chunk a second time return the cached version
    // to avoid doing decompression on the same chunk multiple times which is
    // expensive
    if (chunkInfo === this._lastChunkInfo && this._lastReadResult) {
      // always callback async, even if we have the result
      // https://oren.github.io/blog/zalgo.html
      const lastReadResult = this._lastReadResult;
      return setImmediate(() => callback(null, lastReadResult));
    }

    const {
      nextChunk
    } = chunkInfo;
    const readLength = nextChunk ? nextChunk.chunkPosition - chunkInfo.chunkPosition : this._file.size() - chunkInfo.chunkPosition;

    this._file.read(chunkInfo.chunkPosition, readLength, (err, buffer) => {
      if (err || !buffer) {
        return callback(err || new Error("Missing both error and buffer"));
      }

      const chunk = this.readRecordFromBuffer(buffer, chunkInfo.chunkPosition, _record__WEBPACK_IMPORTED_MODULE_2__["Chunk"]);
      const {
        compression
      } = chunk;

      if (compression !== "none") {
        const decompressFn = decompress[compression];

        if (!decompressFn) {
          return callback(new Error(`Unsupported compression type ${chunk.compression}`));
        }

        const result = decompressFn(chunk.data, chunk.size);
        chunk.data = result;
      }

      const indices = this.readRecordsFromBuffer(buffer.slice(chunk.length), chunkInfo.count, chunkInfo.chunkPosition + chunk.length, _record__WEBPACK_IMPORTED_MODULE_2__["IndexData"]);
      this._lastChunkInfo = chunkInfo;
      this._lastReadResult = {
        chunk,
        indices
      };
      return callback(null, this._lastReadResult);
    });
  } // reads count records from a buffer starting at fileOffset


  readRecordsFromBuffer(buffer, count, fileOffset, cls) {
    const records = [];
    let bufferOffset = 0;

    for (let i = 0; i < count; i++) {
      const record = this.readRecordFromBuffer(buffer.slice(bufferOffset), fileOffset + bufferOffset, cls);
      bufferOffset += record.end - record.offset;
      records.push(record);
    }

    return records;
  } // read an individual record from a buffer


  readRecordFromBuffer(buffer, fileOffset, cls) {
    const headerLength = buffer.readInt32LE(0);
    const record = Object(_header__WEBPACK_IMPORTED_MODULE_0__["parseHeader"])(buffer.slice(4, 4 + headerLength), cls);
    const dataOffset = 4 + headerLength + 4;
    const dataLength = buffer.readInt32LE(4 + headerLength);
    const data = buffer.slice(dataOffset, dataOffset + dataLength);
    record.parseData(data);
    record.offset = fileOffset;
    record.dataOffset = record.offset + 4 + headerLength + 4;
    record.end = record.dataOffset + dataLength;
    record.length = record.end - record.offset;
    return record;
  }

}

/***/ }),

/***/ "./src/MessageReader.js":
/*!******************************!*\
  !*** ./src/MessageReader.js ***!
  \******************************/
/*! exports provided: MessageReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return MessageReader; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "int53");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




// this has hard-coded buffer reading functions for each
// of the standard message types http://docs.ros.org/api/std_msgs/html/index-msg.html
// eventually custom types decompose into these standard types
class StandardTypeReader {
  constructor(buffer) {
    _defineProperty(this, "buffer", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "view", void 0);

    this.buffer = buffer;
    this.offset = 0;
    this.view = new DataView(buffer.buffer, buffer.byteOffset);
  }

  string() {
    const len = this.int32();
    const codePoints = new Uint8Array(this.buffer.buffer, this.buffer.byteOffset + this.offset, len);
    this.offset += len; // if the string is relatively short we can use apply
    // but very long strings can cause a stack overflow due to too many arguments
    // in those cases revert to a slower itterative string building approach

    if (codePoints.length < 1000) {
      return String.fromCharCode.apply(null, codePoints);
    }

    let data = "";

    for (let i = 0; i < len; i++) {
      data += String.fromCharCode(codePoints[i]);
    }

    return data;
  }

  bool() {
    return this.uint8() !== 0;
  }

  int8() {
    return this.view.getInt8(this.offset++);
  }

  uint8() {
    return this.view.getUint8(this.offset++);
  }

  typedArray(len, arrayType) {
    const arrayLength = len == null ? this.uint32() : len;
    const data = new arrayType(this.view.buffer, this.offset + this.view.byteOffset, arrayLength);
    this.offset += arrayLength;
    return data;
  }

  int16() {
    const result = this.view.getInt16(this.offset, true);
    this.offset += 2;
    return result;
  }

  uint16() {
    const result = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return result;
  }

  int32() {
    const result = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return result;
  }

  uint32() {
    const result = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return result;
  }

  float32() {
    const result = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return result;
  }

  float64() {
    const result = this.view.getFloat64(this.offset, true);
    this.offset += 8;
    return result;
  }

  int64() {
    const offset = this.offset;
    this.offset += 8;
    return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readInt64LE(this.buffer, offset);
  }

  uint64() {
    const offset = this.offset;
    this.offset += 8;
    return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readUInt64LE(this.buffer, offset);
  }

  time() {
    const offset = this.offset;
    this.offset += 8;
    return Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(this.buffer, offset);
  }

  duration() {
    const offset = this.offset;
    this.offset += 8;
    return Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(this.buffer, offset);
  }

}

const findTypeByName = (types, name = "") => {
  let foundName = ""; // track name separately in a non-null variable to appease Flow

  const matches = types.filter(type => {
    const typeName = type.name || ""; // if the search is empty, return unnamed types

    if (!name) {
      return !typeName;
    } // return if the search is in the type name
    // or matches exactly if a fully-qualified name match is passed to us


    const nameEnd = name.indexOf("/") > -1 ? name : `/${name}`;

    if (typeName.endsWith(nameEnd)) {
      foundName = typeName;
      return true;
    }

    return false;
  });

  if (matches.length !== 1) {
    throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}`);
  }

  return { ...matches[0],
    name: foundName
  };
};

const constructorBody = type => {
  return type.definitions.filter(def => !def.isConstant).map(def => {
    return `this.${def.name} = undefined`;
  }).join(";\n");
};

const friendlyName = name => name.replace("/", "_");

const createParser = types => {
  const unnamedTypes = types.filter(type => !type.name);

  if (unnamedTypes.length !== 1) {
    throw new Error("multiple unnamed types");
  }

  const [unnamedType] = unnamedTypes;
  const namedTypes = types.filter(type => !!type.name);
  let js = `
  var Record = function () {
    ${constructorBody(unnamedType)}
  };\n`;
  namedTypes.forEach(t => {
    js += `
Record.${friendlyName(t.name)} = function() {
  ${constructorBody(t)}
};\n`;
  });
  let stack = 0;

  const getReaderLines = (type, fieldName = "record") => {
    let readerLines = [];
    type.definitions.forEach(def => {
      if (def.isConstant) {
        return;
      }

      if (def.isArray) {
        if (def.type === "uint8" || def.type === "int8") {
          const arrayType = def.type === "uint8" ? "Uint8Array" : "Int8Array";
          readerLines.push(`${fieldName}.${def.name} = reader.typedArray(${String(def.arrayLength)}, ${arrayType});`);
          return;
        } // because we might have nested arrays
        // we need to incrementally number varaibles so they aren't
        // stomped on by other variables in the function


        stack++; // name for the length field in the for-loop

        const lenField = `length_${stack}`; // name for a child collection

        const childName = `cplx_${stack}`; // name to the itterator in the for-loop

        const incName = `${childName}_inc_${stack}`; // set a variable pointing to the parsed fixed array length
        // or read the byte indicating the dynamic length

        readerLines.push(`var ${lenField} = ${def.arrayLength ? def.arrayLength : "reader.uint32();"}`); // only allocate an array if there is a length - skips empty allocations

        const arrayName = `${fieldName}.${def.name}`; // allocate the new array to a fixed length since we know it ahead of time

        readerLines.push(`${arrayName} = new Array(${lenField})`); // start the for-loop

        readerLines.push(`for (var ${incName} = 0; ${incName} < ${lenField}; ${incName}++) {`); // if the sub type is complex we need to allocate it and parse its values

        if (def.isComplex) {
          const defType = findTypeByName(types, def.type);
          readerLines.push(`var ${childName} = new Record.${friendlyName(defType.name)}();`); // recursively generate the parse instructions for the sub-type

          readerLines = readerLines.concat(getReaderLines(defType, `${childName}`));
          readerLines.push(`${arrayName}[${incName}] = ${childName}`);
        } else {
          // if the subtype is not complex its a simple low-level reader operation
          readerLines.push(`${arrayName}[${incName}] = reader.${def.type}();`);
        }

        readerLines.push("}"); // close the for-loop
      } else if (def.isComplex) {
        const defType = findTypeByName(types, def.type);
        readerLines.push(`${fieldName}.${def.name} = new Record.${friendlyName(defType.name)}();`);
        readerLines = readerLines.concat(getReaderLines(defType, `${fieldName}.${def.name}`));
      } else {
        readerLines.push(`${fieldName}.${def.name} = reader.${def.type}();`);
      }
    });
    return readerLines;
  };

  const lines = getReaderLines(unnamedType).join("\n");
  const readerFn = `
  return function read(reader) {
    var record = new Record();
    ${lines}
    return record;
  };`;
  js += readerFn;

  let _read;

  try {
    _read = eval(`(function buildReader() { ${js} })()`);
  } catch (e) {
    console.error("error building parser:", js); // eslint-disable-line

    throw e;
  }

  return function (buffer) {
    const reader = new StandardTypeReader(buffer);
    return _read(reader);
  };
};

class MessageReader {
  // takes a multi-line string message definition and returns
  // a message reader which can be used to read messages based
  // on the message definition
  constructor(messageDefinition) {
    _defineProperty(this, "reader", void 0);

    const definitions = Object(_parseMessageDefinition__WEBPACK_IMPORTED_MODULE_2__["parseMessageDefinition"])(messageDefinition);
    this.reader = createParser(definitions);
  }

  readMessage(buffer) {
    return this.reader(buffer);
  }

}

/***/ }),

/***/ "./src/ReadResult.js":
/*!***************************!*\
  !*** ./src/ReadResult.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReadResult; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// represents a result passed to the callback from the high-level call:
// bag.readMessages({ opts: any }, callback: (ReadResult) => void) => Promise<void>
class ReadResult {
  constructor(topic, message, timestamp, data, chunkOffset, totalChunks) {
    _defineProperty(this, "topic", void 0);

    _defineProperty(this, "message", void 0);

    _defineProperty(this, "timestamp", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "chunkOffset", void 0);

    _defineProperty(this, "totalChunks", void 0);

    // string: the topic the message was on
    this.topic = topic; // any: the parsed body of the message based on connection.messageDefinition

    this.message = message; // time: the timestamp of the message

    this.timestamp = timestamp; // buffer: raw buffer data of the message

    this.data = data; // the offset of the currently read chunk

    this.chunkOffset = chunkOffset; // the total number of chunks in the read operation

    this.totalChunks = totalChunks;
  }

}

/***/ }),

/***/ "./src/TimeUtil.js":
/*!*************************!*\
  !*** ./src/TimeUtil.js ***!
  \*************************/
/*! exports provided: fromDate, toDate, compare, isLessThan, isGreaterThan, areSame, add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromDate", function() { return fromDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDate", function() { return toDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compare", function() { return compare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLessThan", function() { return isLessThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGreaterThan", function() { return isGreaterThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areSame", function() { return areSame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
function fromDate(date) {
  const sec = Math.floor(date.getTime() / 1000);
  const nsec = date.getMilliseconds() * 1e6;
  return {
    sec,
    nsec
  };
}
function toDate(time) {
  return new Date(time.sec * 1e3 + time.nsec / 1e6);
} // compare two times, returning a negative value if the right is greater
// or a positive value if the left is greater or 0 if the times are equal
// useful to supply to Array.prototype.sort

function compare(left, right) {
  const secDiff = left.sec - right.sec;
  return secDiff || left.nsec - right.nsec;
} // returns true if the left time is less than the right time, otherwise false

function isLessThan(left, right) {
  return this.compare(left, right) < 0;
} // returns true if the left time is greater than the right time, otherwise false

function isGreaterThan(left, right) {
  return this.compare(left, right) > 0;
} // returns true if both times have the same number of seconds and nanoseconds

function areSame(left, right) {
  return left.sec === right.sec && left.nsec === right.nsec;
}

function toString(time) {
  return `{${time.sec}, ${time.nsec}}`;
} // computes the sum of two times or durations and returns a new time
// throws an exception if the resulting time is negative


function add(left, right) {
  const durationNanos = left.nsec + right.nsec;
  const secsFromNanos = Math.floor(durationNanos / 1e9);
  const newSecs = left.sec + right.sec + secsFromNanos;
  const remainingDurationNanos = durationNanos % 1e9; // use Math.abs here to prevent -0 when there is exactly 1 second of negative nanoseconds passed in

  const newNanos = Math.abs(Math.sign(remainingDurationNanos) === -1 ? 1e9 + remainingDurationNanos : remainingDurationNanos);
  const result = {
    sec: newSecs,
    nsec: newNanos
  };

  if (result.sec < 0 || result.nsec < 0) {
    throw new Error(`Invalid time: ${toString(result)} produced from TimeUtil.add(${toString(left)}, ${toString(right)}})`);
  }

  return result;
}

/***/ }),

/***/ "./src/bag.js":
/*!********************!*\
  !*** ./src/bag.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bag; });
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BagReader */ "./src/BagReader.js");
/* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
/* harmony import */ var _ReadResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReadResult */ "./src/ReadResult.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./record */ "./src/record.js");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.





// the high level rosbag interface
// create a new bag by calling:
// `const bag = await Bag.open('./path-to-file.bag')` in node or
// `const bag = await Bag.open(files[0])` in the browser
//
// after that you can consume messages by calling
// `await bag.readMessages({ topics: ['/foo'] },
//    (result) => console.log(result.topic, result.message))`
class Bag {
  // you can optionally create a bag manually passing in a bagReader instance
  constructor(bagReader) {
    _defineProperty(this, "reader", void 0);

    _defineProperty(this, "header", void 0);

    _defineProperty(this, "connections", void 0);

    _defineProperty(this, "chunkInfos", void 0);

    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "endTime", void 0);

    this.reader = bagReader;
  } // eslint-disable-next-line no-unused-vars


  // if the bag is manually created with the constructor, you must call `await open()` on the bag
  // generally this is called for you if you're using `const bag = await Bag.open()`
  async open() {
    this.header = await this.reader.readHeaderAsync();
    const {
      connectionCount,
      chunkCount,
      indexPosition
    } = this.header;
    const result = await this.reader.readConnectionsAndChunkInfoAsync(indexPosition, connectionCount, chunkCount);
    this.connections = {};
    result.connections.forEach(connection => {
      this.connections[connection.conn] = connection;
    });
    this.chunkInfos = result.chunkInfos;

    if (chunkCount > 0) {
      this.startTime = this.chunkInfos[0].startTime;
      this.endTime = this.chunkInfos[chunkCount - 1].endTime;
    }
  }

  async readMessages(opts, callback) {
    const connections = this.connections;
    const startTime = opts.startTime || {
      sec: 0,
      nsec: 0
    };
    const endTime = opts.endTime || {
      sec: Number.MAX_VALUE,
      nsec: Number.MAX_VALUE
    };
    const topics = opts.topics || Object.keys(connections).map(id => {
      return connections[id].topic;
    });
    const filteredConnections = Object.keys(connections).filter(id => {
      return topics.indexOf(connections[id].topic) !== -1;
    }).map(id => +id);
    const {
      decompress = {}
    } = opts; // filter chunks to those which fall within the time range we're attempting to read

    const chunkInfos = this.chunkInfos.filter(info => {
      return _TimeUtil__WEBPACK_IMPORTED_MODULE_4__["compare"](info.startTime, endTime) <= 0 && _TimeUtil__WEBPACK_IMPORTED_MODULE_4__["compare"](startTime, info.endTime) <= 0;
    });

    function parseMsg(msg, chunkOffset) {
      const connection = connections[msg.conn];
      const {
        topic
      } = connection;
      const {
        data,
        time: timestamp
      } = msg;
      let message = null;

      if (!opts.noParse) {
        // lazily create a reader for this connection if it doesn't exist
        connection.reader = connection.reader || new _MessageReader__WEBPACK_IMPORTED_MODULE_1__["MessageReader"](connection.messageDefinition);
        message = connection.reader.readMessage(data);
      }

      return new _ReadResult__WEBPACK_IMPORTED_MODULE_2__["default"](topic, message, timestamp, data, chunkOffset, chunkInfos.length);
    }

    for (let i = 0; i < chunkInfos.length; i++) {
      const info = chunkInfos[i];
      const messages = await this.reader.readChunkMessagesAsync(info, filteredConnections, startTime, endTime, decompress);
      messages.forEach(msg => callback(parseMsg(msg, i)));
    }
  }

}

_defineProperty(Bag, "open", file => {
  throw new Error("This method should have been overridden based on the environment. Make sure you are correctly importing the node or web version of Bag.");
});

/***/ }),

/***/ "./src/fields.js":
/*!***********************!*\
  !*** ./src/fields.js ***!
  \***********************/
/*! exports provided: extractFields, extractTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractFields", function() { return extractFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractTime", function() { return extractTime; });
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// reads through a buffer and extracts { [key: string]: value: string }
// pairs - the buffer is expected to have length prefixed utf8 strings
// with a '=' separating the key and value
function extractFields(buffer) {
  if (buffer.length < 4) {
    throw new Error("Header fields are truncated.");
  }

  let i = 0;
  const fields = {};

  while (i < buffer.length) {
    const length = buffer.readInt32LE(i);
    i += 4;

    if (i + length > buffer.length) {
      throw new Error("Header fields are corrupt.");
    }

    const field = buffer.slice(i, i + length);
    const index = field.indexOf("=");

    if (index === -1) {
      throw new Error("Header field is missing equals sign.");
    }

    fields[field.slice(0, index).toString()] = field.slice(index + 1);
    i += length;
  }

  return fields;
} // reads a Time object out of a buffer at the given offset

function extractTime(buffer, offset) {
  const sec = buffer.readUInt32LE(offset);
  const nsec = buffer.readUInt32LE(offset + 4);
  return {
    sec,
    nsec
  };
}

/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/*! exports provided: parseHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHeader", function() { return parseHeader; });
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./record */ "./src/record.js");
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.

 // given a buffer parses out the record within the buffer
// based on the opcode type bit

function parseHeader(buffer, cls) {
  const fields = Object(_fields__WEBPACK_IMPORTED_MODULE_0__["extractFields"])(buffer);

  if (fields.op === undefined) {
    throw new Error("Header is missing 'op' field.");
  }

  const opcode = fields.op.readUInt8(0);

  if (opcode !== cls.opcode) {
    throw new Error(`Expected ${cls.name} (${cls.opcode}) but found ${opcode}`);
  }

  return new cls(fields);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return _TimeUtil__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bag */ "./src/bag.js");
/* empty/unused harmony star reexport *//* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BagReader */ "./src/BagReader.js");
/* empty/unused harmony star reexport *//* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return _MessageReader__WEBPACK_IMPORTED_MODULE_3__["MessageReader"]; });

/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_4__["rosPrimitiveTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_4__["parseMessageDefinition"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./src/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_5__) if(["TimeUtil","default","MessageReader","rosPrimitiveTypes","parseMessageDefinition","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_5__[key]; }) }(__WEBPACK_IMPORT_KEY__));
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.








/***/ }),

/***/ "./src/nmerge.js":
/*!***********************!*\
  !*** ./src/nmerge.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! heap */ "heap");
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(heap__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.


function nmerge(key, ...iterables) {
  const heap = new heap__WEBPACK_IMPORTED_MODULE_0___default.a((a, b) => {
    return key(a.value, b.value);
  });

  for (let i = 0; i < iterables.length; i++) {
    const {
      value,
      done
    } = iterables[i].next();

    if (!done) {
      heap.push({
        i,
        value
      });
    }
  }

  return {
    next: () => {
      if (heap.empty()) {
        return {
          done: true
        };
      }

      const {
        i
      } = heap.front();
      const next = iterables[i].next();

      if (next.done) {
        return {
          value: heap.pop().value,
          done: false
        };
      }

      return {
        value: heap.replace({
          i,
          value: next.value
        }).value,
        done: false
      };
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (nmerge);

/***/ }),

/***/ "./src/node/index.js":
/*!***************************!*\
  !*** ./src/node/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reader", function() { return Reader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "open", function() { return open; });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "buffer");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index */ "./src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["TimeUtil"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["MessageReader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["parseMessageDefinition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["rosPrimitiveTypes"]; });

/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../bag */ "./src/bag.js");
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BagReader */ "./src/BagReader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BagReader", function() { return _BagReader__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_5__) if(["Reader","TimeUtil","BagReader","MessageReader","open","parseMessageDefinition","rosPrimitiveTypes","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_5__[key]; }) }(__WEBPACK_IMPORT_KEY__));
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




 // reader using nodejs fs api

class Reader {
  constructor(filename) {
    _defineProperty(this, "_filename", void 0);

    _defineProperty(this, "_fd", void 0);

    _defineProperty(this, "_size", void 0);

    _defineProperty(this, "_buffer", void 0);

    this._filename = filename;
    this._fd = undefined;
    this._size = 0;
    this._buffer = buffer__WEBPACK_IMPORTED_MODULE_0__["Buffer"].allocUnsafe(0);
  } // open a file for reading


  _open(cb) {
    fs__WEBPACK_IMPORTED_MODULE_1__["stat"](this._filename, (error, stat) => {
      if (error) {
        return cb(error);
      }

      return fs__WEBPACK_IMPORTED_MODULE_1__["open"](this._filename, "r", (err, fd) => {
        if (err) {
          return cb(err);
        }

        this._fd = fd;
        this._size = stat.size;
        return cb(null);
      });
    });
  }

  close(cb) {
    if (this._fd != null) {
      fs__WEBPACK_IMPORTED_MODULE_1__["close"](this._fd, cb);
    }
  } // read length (bytes) starting from offset (bytes)
  // callback(err, buffer)


  read(offset, length, cb) {
    if (this._fd == null) {
      return this._open(err => {
        return err ? cb(err) : this.read(offset, length, cb);
      });
    }

    if (length > this._buffer.byteLength) {
      this._buffer = buffer__WEBPACK_IMPORTED_MODULE_0__["Buffer"].alloc(length);
    }

    return fs__WEBPACK_IMPORTED_MODULE_1__["read"](this._fd, this._buffer, 0, length, offset, (err, bytes, buff) => {
      return err ? cb(err) : cb(null, buff);
    });
  } // return the size of the file


  size() {
    return this._size;
  }

}

const open = async filename => {
  if (typeof filename !== "string") {
    throw new Error("Expected filename to be a string. Make sure you are correctly importing the node or web version of Bag.");
  }

  const bag = new _bag__WEBPACK_IMPORTED_MODULE_3__["default"](new _BagReader__WEBPACK_IMPORTED_MODULE_4__["default"](new Reader(filename)));
  await bag.open();
  return bag;
};

_bag__WEBPACK_IMPORTED_MODULE_3__["default"].open = open;


/* harmony default export */ __webpack_exports__["default"] = (_bag__WEBPACK_IMPORTED_MODULE_3__["default"]);

/***/ }),

/***/ "./src/parseMessageDefinition.js":
/*!***************************************!*\
  !*** ./src/parseMessageDefinition.js ***!
  \***************************************/
/*! exports provided: rosPrimitiveTypes, parseMessageDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return rosPrimitiveTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return parseMessageDefinition; });
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// Set of built-in ros types. See http://wiki.ros.org/msg#Field_Types
const rosPrimitiveTypes = new Set(["string", "bool", "int8", "uint8", "int16", "uint16", "int32", "uint32", "float32", "float64", "int64", "uint64", "time", "duration"]);

function normalizeType(type) {
  // Normalize deprecated aliases.
  let normalizedType = type;

  if (type === "char") {
    normalizedType = "uint8";
  }

  if (type === "byte") {
    normalizedType = "int8";
  }

  return normalizedType;
} // represents a single line in a message definition type
// e.g. 'string name' 'CustomType[] foo' 'string[3] names'


function newArrayDefinition(type, name, arrayLength) {
  const normalizedType = normalizeType(type);
  return {
    type: normalizedType,
    name,
    isArray: true,
    arrayLength: arrayLength === null ? undefined : arrayLength,
    isComplex: !rosPrimitiveTypes.has(normalizedType)
  };
}

function newDefinition(type, name) {
  const normalizedType = normalizeType(type);
  return {
    type: normalizedType,
    name,
    isArray: false,
    isComplex: !rosPrimitiveTypes.has(normalizedType)
  };
}

const buildType = lines => {
  const definitions = [];
  let complexTypeName;
  lines.forEach(line => {
    // remove comments and extra whitespace from each line
    const splits = line.replace(/#.*/gi, "").split(" ").filter(word => word);

    if (!splits[1]) {
      return;
    } // consume comments


    const type = splits[0].trim();
    const name = splits[1].trim();

    if (type === "MSG:") {
      complexTypeName = name;
    } else if (name.indexOf("=") > -1 || splits.indexOf("=") > -1) {
      // constant type parsing
      const matches = line.match(/(\S+)\s*=\s*(.*)\s*/);

      if (!matches) {
        throw new Error("Malformed line: " + line);
      }

      let value = matches[2];

      if (type !== "string") {
        try {
          value = JSON.parse(value.replace(/\s*#.*/g, ""));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(`Error in this constant definition: ${line}`);
          throw error;
        }

        if (type === "bool") {
          value = Boolean(value);
        }
      }

      if (type.includes("int") && value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
        // eslint-disable-next-line no-console
        console.warn(`Found integer constant outside safe integer range: ${line}`);
      }

      definitions.push({
        type: normalizeType(type),
        name: matches[1],
        isConstant: true,
        value
      });
    } else if (type.indexOf("]") === type.length - 1) {
      // array type parsing
      const typeSplits = type.split("[");
      const baseType = typeSplits[0];
      const len = typeSplits[1].replace("]", "");
      definitions.push(newArrayDefinition(baseType, name, len ? parseInt(len, 10) : undefined));
    } else {
      definitions.push(newDefinition(type, name));
    }
  });
  return {
    name: complexTypeName,
    definitions
  };
};

const findTypeByName = (types, name) => {
  const matches = types.filter(type => {
    const typeName = type.name || ""; // if the search is empty, return unnamed types

    if (!name) {
      return !typeName;
    } // return if the search is in the type name
    // or matches exactly if a fully-qualified name match is passed to us


    const nameEnd = name.indexOf("/") > -1 ? name : `/${name}`;
    return typeName.endsWith(nameEnd);
  });

  if (matches.length !== 1) {
    throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}`);
  }

  return matches[0];
}; // Given a raw message definition string, parse it into an object representation.
// Example return value:
// [{
//   name: undefined,
//   definitions: [
//     {
//       arrayLength: undefined,
//       isArray: false,
//       isComplex: false,
//       name: "name",
//       type: "string",
//     }, ...
//   ],
// }, ... ]
//
// See unit tests for more examples.


function parseMessageDefinition(messageDefinition) {
  // read all the lines and remove empties
  const allLines = messageDefinition.split("\n").map(line => line.trim()).filter(line => line);
  let definitionLines = [];
  const types = []; // group lines into individual definitions

  allLines.forEach(line => {
    // skip comment lines
    if (line.indexOf("#") === 0) {
      return;
    } // definitions are split by equal signs


    if (line.indexOf("==") === 0) {
      types.push(buildType(definitionLines));
      definitionLines = [];
    } else {
      definitionLines.push(line);
    }
  });
  types.push(buildType(definitionLines)); // Fix up complex type names

  types.forEach(({
    definitions
  }) => {
    definitions.forEach(definition => {
      if (definition.isComplex) {
        const foundName = findTypeByName(types, definition.type).name;

        if (foundName === undefined) {
          throw new Error(`Missing type definition for ${definition.type}`);
        }

        definition.type = foundName;
      }
    });
  });
  return types;
}

/***/ }),

/***/ "./src/record.js":
/*!***********************!*\
  !*** ./src/record.js ***!
  \***********************/
/*! exports provided: Record, BagHeader, Chunk, Connection, MessageData, IndexData, ChunkInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Record", function() { return Record; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BagHeader", function() { return BagHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chunk", function() { return Chunk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return Connection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageData", function() { return MessageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexData", function() { return IndexData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChunkInfo", function() { return ChunkInfo; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "int53");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




const readUInt64LE = buffer => {
  return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readUInt64LE(buffer, 0);
};

class Record {
  constructor(_fields) {
    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "dataOffset", void 0);

    _defineProperty(this, "end", void 0);

    _defineProperty(this, "length", void 0);
  }

  parseData(_buffer) {}

}
class BagHeader extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "indexPosition", void 0);

    _defineProperty(this, "connectionCount", void 0);

    _defineProperty(this, "chunkCount", void 0);

    this.indexPosition = readUInt64LE(fields.index_pos);
    this.connectionCount = fields.conn_count.readInt32LE(0);
    this.chunkCount = fields.chunk_count.readInt32LE(0);
  }

}

_defineProperty(BagHeader, "opcode", 3);

class Chunk extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "compression", void 0);

    _defineProperty(this, "size", void 0);

    _defineProperty(this, "data", void 0);

    this.compression = fields.compression.toString();
    this.size = fields.size.readUInt32LE(0);
  }

  parseData(buffer) {
    this.data = buffer;
  }

}

_defineProperty(Chunk, "opcode", 5);

const getField = (fields, key) => {
  if (fields[key] === undefined) {
    throw new Error(`Connection header is missing ${key}.`);
  }

  return fields[key].toString();
};

class Connection extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "topic", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "md5sum", void 0);

    _defineProperty(this, "messageDefinition", void 0);

    _defineProperty(this, "callerid", void 0);

    _defineProperty(this, "latching", void 0);

    _defineProperty(this, "reader", void 0);

    this.conn = fields.conn.readUInt32LE(0);
    this.topic = fields.topic.toString();
    this.type = undefined;
    this.md5sum = undefined;
    this.messageDefinition = "";
  }

  parseData(buffer) {
    const fields = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractFields"])(buffer);
    this.type = getField(fields, "type");
    this.md5sum = getField(fields, "md5sum");
    this.messageDefinition = getField(fields, "message_definition");

    if (fields.callerid !== undefined) {
      this.callerid = fields.callerid.toString();
    }

    if (fields.latching !== undefined) {
      this.latching = fields.latching.toString() === "1";
    }
  }

}

_defineProperty(Connection, "opcode", 7);

class MessageData extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "time", void 0);

    _defineProperty(this, "data", void 0);

    this.conn = fields.conn.readUInt32LE(0);
    this.time = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.time, 0);
  }

  parseData(buffer) {
    this.data = buffer;
  }

}

_defineProperty(MessageData, "opcode", 2);

class IndexData extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "ver", void 0);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "count", void 0);

    _defineProperty(this, "indices", void 0);

    this.ver = fields.ver.readUInt32LE(0);
    this.conn = fields.conn.readUInt32LE(0);
    this.count = fields.count.readUInt32LE(0);
  }

  parseData(buffer) {
    this.indices = [];

    for (let i = 0; i < this.count; i++) {
      this.indices.push({
        time: Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(buffer, i * 12),
        offset: buffer.readUInt32LE(i * 12 + 8)
      });
    }
  }

}

_defineProperty(IndexData, "opcode", 4);

class ChunkInfo extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "ver", void 0);

    _defineProperty(this, "chunkPosition", void 0);

    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "endTime", void 0);

    _defineProperty(this, "count", void 0);

    _defineProperty(this, "connections", void 0);

    _defineProperty(this, "nextChunk", void 0);

    this.ver = fields.ver.readUInt32LE(0);
    this.chunkPosition = readUInt64LE(fields.chunk_pos);
    this.startTime = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.start_time, 0);
    this.endTime = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.end_time, 0);
    this.count = fields.count.readUInt32LE(0);
  }

  parseData(buffer) {
    this.connections = [];

    for (let i = 0; i < this.count; i++) {
      this.connections.push({
        conn: buffer.readUInt32LE(i * 8),
        count: buffer.readUInt32LE(i * 8 + 4)
      });
    }
  }

}

_defineProperty(ChunkInfo, "opcode", 6);

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "heap":
/*!***********************!*\
  !*** external "heap" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("heap");

/***/ }),

/***/ "int53":
/*!************************!*\
  !*** external "int53" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("int53");

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3NiYWcvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Jvc2JhZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvQmFnUmVhZGVyLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9NZXNzYWdlUmVhZGVyLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9SZWFkUmVzdWx0LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9UaW1lVXRpbC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvYmFnLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9maWVsZHMuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL25tZXJnZS5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvbm9kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvcGFyc2VNZXNzYWdlRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvcmVjb3JkLmpzIiwid2VicGFjazovL3Jvc2JhZy9leHRlcm5hbCBcImJ1ZmZlclwiIiwid2VicGFjazovL3Jvc2JhZy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vcm9zYmFnL2V4dGVybmFsIFwiaGVhcFwiIiwid2VicGFjazovL3Jvc2JhZy9leHRlcm5hbCBcImludDUzXCIiXSwibmFtZXMiOlsiSEVBREVSX1JFQURBSEVBRCIsIkhFQURFUl9PRkZTRVQiLCJCYWdSZWFkZXIiLCJjb25zdHJ1Y3RvciIsImZpbGVsaWtlIiwiX2ZpbGUiLCJfbGFzdENodW5rSW5mbyIsInVuZGVmaW5lZCIsInZlcmlmeUJhZ0hlYWRlciIsImNhbGxiYWNrIiwibmV4dCIsInJlYWQiLCJlcnJvciIsImJ1ZmZlciIsIkVycm9yIiwic2l6ZSIsInRvU3RyaW5nIiwicmVhZEhlYWRlciIsImxlbmd0aCIsImhlYWRlckxlbmd0aCIsInJlYWRJbnQzMkxFIiwiaGVhZGVyIiwicmVhZFJlY29yZEZyb21CdWZmZXIiLCJCYWdIZWFkZXIiLCJyZWFkSGVhZGVyQXN5bmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVyciIsInJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mbyIsImZpbGVPZmZzZXQiLCJjb25uZWN0aW9uQ291bnQiLCJjaHVua0NvdW50IiwiY29ubmVjdGlvbnMiLCJjaHVua0luZm9zIiwicmVhZFJlY29yZHNGcm9tQnVmZmVyIiwiQ29ubmVjdGlvbiIsImNvbm5lY3Rpb25CbG9ja0xlbmd0aCIsImVuZCIsIm9mZnNldCIsInNsaWNlIiwiQ2h1bmtJbmZvIiwiaSIsIm5leHRDaHVuayIsInJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mb0FzeW5jIiwicmVzdWx0IiwicmVhZENodW5rTWVzc2FnZXMiLCJjaHVua0luZm8iLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZGVjb21wcmVzcyIsInN0YXJ0Iiwic2VjIiwibnNlYyIsIk51bWJlciIsIk1BWF9WQUxVRSIsImNvbm5zIiwibWFwIiwiY29ubmVjdGlvbiIsImNvbm4iLCJyZWFkQ2h1bmsiLCJjaHVuayIsImluZGljZXMiLCJmb3JFYWNoIiwiaW5kZXgiLCJwcmVzZW50Q29ubmVjdGlvbnMiLCJmaWx0ZXIiLCJpdGVyYWJsZXMiLCJTeW1ib2wiLCJpdGVyYXRvciIsIml0ZXIiLCJubWVyZ2UiLCJhIiwiYiIsImVudHJpZXMiLCJpdGVtIiwiZG9uZSIsInZhbHVlIiwiVGltZVV0aWwiLCJ0aW1lIiwicHVzaCIsIm1lc3NhZ2VzIiwiZW50cnkiLCJkYXRhIiwiZGF0YU9mZnNldCIsIk1lc3NhZ2VEYXRhIiwicmVhZENodW5rTWVzc2FnZXNBc3luYyIsIl9sYXN0UmVhZFJlc3VsdCIsImxhc3RSZWFkUmVzdWx0Iiwic2V0SW1tZWRpYXRlIiwicmVhZExlbmd0aCIsImNodW5rUG9zaXRpb24iLCJDaHVuayIsImNvbXByZXNzaW9uIiwiZGVjb21wcmVzc0ZuIiwiY291bnQiLCJJbmRleERhdGEiLCJjbHMiLCJyZWNvcmRzIiwiYnVmZmVyT2Zmc2V0IiwicmVjb3JkIiwicGFyc2VIZWFkZXIiLCJkYXRhTGVuZ3RoIiwicGFyc2VEYXRhIiwiU3RhbmRhcmRUeXBlUmVhZGVyIiwidmlldyIsIkRhdGFWaWV3IiwiYnl0ZU9mZnNldCIsInN0cmluZyIsImxlbiIsImludDMyIiwiY29kZVBvaW50cyIsIlVpbnQ4QXJyYXkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJhcHBseSIsImJvb2wiLCJ1aW50OCIsImludDgiLCJnZXRJbnQ4IiwiZ2V0VWludDgiLCJ0eXBlZEFycmF5IiwiYXJyYXlUeXBlIiwiYXJyYXlMZW5ndGgiLCJ1aW50MzIiLCJpbnQxNiIsImdldEludDE2IiwidWludDE2IiwiZ2V0VWludDE2IiwiZ2V0SW50MzIiLCJnZXRVaW50MzIiLCJmbG9hdDMyIiwiZ2V0RmxvYXQzMiIsImZsb2F0NjQiLCJnZXRGbG9hdDY0IiwiaW50NjQiLCJpbnQ1MyIsInJlYWRJbnQ2NExFIiwidWludDY0IiwicmVhZFVJbnQ2NExFIiwiZXh0cmFjdFRpbWUiLCJkdXJhdGlvbiIsImZpbmRUeXBlQnlOYW1lIiwidHlwZXMiLCJuYW1lIiwiZm91bmROYW1lIiwibWF0Y2hlcyIsInR5cGUiLCJ0eXBlTmFtZSIsIm5hbWVFbmQiLCJpbmRleE9mIiwiZW5kc1dpdGgiLCJjb25zdHJ1Y3RvckJvZHkiLCJkZWZpbml0aW9ucyIsImRlZiIsImlzQ29uc3RhbnQiLCJqb2luIiwiZnJpZW5kbHlOYW1lIiwicmVwbGFjZSIsImNyZWF0ZVBhcnNlciIsInVubmFtZWRUeXBlcyIsInVubmFtZWRUeXBlIiwibmFtZWRUeXBlcyIsImpzIiwidCIsInN0YWNrIiwiZ2V0UmVhZGVyTGluZXMiLCJmaWVsZE5hbWUiLCJyZWFkZXJMaW5lcyIsImlzQXJyYXkiLCJsZW5GaWVsZCIsImNoaWxkTmFtZSIsImluY05hbWUiLCJhcnJheU5hbWUiLCJpc0NvbXBsZXgiLCJkZWZUeXBlIiwiY29uY2F0IiwibGluZXMiLCJyZWFkZXJGbiIsIl9yZWFkIiwiZXZhbCIsImUiLCJjb25zb2xlIiwicmVhZGVyIiwiTWVzc2FnZVJlYWRlciIsIm1lc3NhZ2VEZWZpbml0aW9uIiwicGFyc2VNZXNzYWdlRGVmaW5pdGlvbiIsInJlYWRNZXNzYWdlIiwiUmVhZFJlc3VsdCIsInRvcGljIiwibWVzc2FnZSIsInRpbWVzdGFtcCIsImNodW5rT2Zmc2V0IiwidG90YWxDaHVua3MiLCJmcm9tRGF0ZSIsImRhdGUiLCJNYXRoIiwiZmxvb3IiLCJnZXRUaW1lIiwiZ2V0TWlsbGlzZWNvbmRzIiwidG9EYXRlIiwiRGF0ZSIsImNvbXBhcmUiLCJsZWZ0IiwicmlnaHQiLCJzZWNEaWZmIiwiaXNMZXNzVGhhbiIsImlzR3JlYXRlclRoYW4iLCJhcmVTYW1lIiwiYWRkIiwiZHVyYXRpb25OYW5vcyIsInNlY3NGcm9tTmFub3MiLCJuZXdTZWNzIiwicmVtYWluaW5nRHVyYXRpb25OYW5vcyIsIm5ld05hbm9zIiwiYWJzIiwic2lnbiIsIkJhZyIsImJhZ1JlYWRlciIsIm9wZW4iLCJpbmRleFBvc2l0aW9uIiwicmVhZE1lc3NhZ2VzIiwib3B0cyIsInRvcGljcyIsIk9iamVjdCIsImtleXMiLCJpZCIsImZpbHRlcmVkQ29ubmVjdGlvbnMiLCJpbmZvIiwicGFyc2VNc2ciLCJtc2ciLCJub1BhcnNlIiwiZmlsZSIsImV4dHJhY3RGaWVsZHMiLCJmaWVsZHMiLCJmaWVsZCIsInJlYWRVSW50MzJMRSIsIm9wIiwib3Bjb2RlIiwicmVhZFVJbnQ4Iiwia2V5IiwiaGVhcCIsIkhlYXAiLCJlbXB0eSIsImZyb250IiwicG9wIiwiUmVhZGVyIiwiZmlsZW5hbWUiLCJfZmlsZW5hbWUiLCJfZmQiLCJfc2l6ZSIsIl9idWZmZXIiLCJCdWZmZXIiLCJhbGxvY1Vuc2FmZSIsIl9vcGVuIiwiY2IiLCJmcyIsInN0YXQiLCJmZCIsImNsb3NlIiwiYnl0ZUxlbmd0aCIsImFsbG9jIiwiYnl0ZXMiLCJidWZmIiwiYmFnIiwicm9zUHJpbWl0aXZlVHlwZXMiLCJTZXQiLCJub3JtYWxpemVUeXBlIiwibm9ybWFsaXplZFR5cGUiLCJuZXdBcnJheURlZmluaXRpb24iLCJoYXMiLCJuZXdEZWZpbml0aW9uIiwiYnVpbGRUeXBlIiwiY29tcGxleFR5cGVOYW1lIiwibGluZSIsInNwbGl0cyIsInNwbGl0Iiwid29yZCIsInRyaW0iLCJtYXRjaCIsIkpTT04iLCJwYXJzZSIsIndhcm4iLCJCb29sZWFuIiwiaW5jbHVkZXMiLCJNQVhfU0FGRV9JTlRFR0VSIiwiTUlOX1NBRkVfSU5URUdFUiIsInR5cGVTcGxpdHMiLCJiYXNlVHlwZSIsInBhcnNlSW50IiwiYWxsTGluZXMiLCJkZWZpbml0aW9uTGluZXMiLCJkZWZpbml0aW9uIiwiUmVjb3JkIiwiX2ZpZWxkcyIsImluZGV4X3BvcyIsImNvbm5fY291bnQiLCJjaHVua19jb3VudCIsImdldEZpZWxkIiwibWQ1c3VtIiwiY2FsbGVyaWQiLCJsYXRjaGluZyIsInZlciIsImNodW5rX3BvcyIsInN0YXJ0X3RpbWUiLCJlbmRfdGltZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5Qyxp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QSxDQUFDLEdBQUcsS0FBS3FELEtBQXpCLEVBQWdDckQsQ0FBQyxFQUFqQyxFQUFxQztBQUNuQyxXQUFLVCxXQUFMLENBQWlCK0MsSUFBakIsQ0FBc0I7QUFDcEJyQixZQUFJLEVBQUU5QyxNQUFNLENBQUMrTixZQUFQLENBQW9CbE0sQ0FBQyxHQUFHLENBQXhCLENBRGM7QUFFcEJxRCxhQUFLLEVBQUVsRixNQUFNLENBQUMrTixZQUFQLENBQW9CbE0sQ0FBQyxHQUFHLENBQUosR0FBUSxDQUE1QjtBQUZhLE9BQXRCO0FBSUQ7QUFDRjs7QUEzQm1DOztnQkFBekJELFMsWUFDSyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEpsQixtQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxrQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInJvc2JhZ1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJyb3NiYWdcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbm9kZS9pbmRleC5qc1wiKTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgVGltZSwgQ2FsbGJhY2ssIEZpbGVsaWtlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuaW1wb3J0IHsgcGFyc2VIZWFkZXIgfSBmcm9tIFwiLi9oZWFkZXJcIjtcbmltcG9ydCBubWVyZ2UgZnJvbSBcIi4vbm1lcmdlXCI7XG5pbXBvcnQgeyBSZWNvcmQsIEJhZ0hlYWRlciwgQ2h1bmssIENodW5rSW5mbywgQ29ubmVjdGlvbiwgSW5kZXhEYXRhLCBNZXNzYWdlRGF0YSB9IGZyb20gXCIuL3JlY29yZFwiO1xuaW1wb3J0ICogYXMgVGltZVV0aWwgZnJvbSBcIi4vVGltZVV0aWxcIjtcblxuaW50ZXJmYWNlIENodW5rUmVhZFJlc3VsdCB7XG4gIGNodW5rOiBDaHVuaztcbiAgaW5kaWNlczogSW5kZXhEYXRhW107XG59XG5cbmV4cG9ydCB0eXBlIERlY29tcHJlc3MgPSB7XG4gIFtjb21wcmVzc2lvbjogc3RyaW5nXTogKGJ1ZmZlcjogQnVmZmVyLCBzaXplOiBudW1iZXIpID0+IEJ1ZmZlcixcbn07XG5cbmNvbnN0IEhFQURFUl9SRUFEQUhFQUQgPSA0MDk2O1xuY29uc3QgSEVBREVSX09GRlNFVCA9IDEzO1xuXG4vLyBCYWdSZWFkZXIgaXMgYSBsb3dlciBsZXZlbCBpbnRlcmZhY2UgZm9yIHJlYWRpbmcgc3BlY2lmaWMgc2VjdGlvbnMgJiBjaHVua3Ncbi8vIGZyb20gYSByb3NiYWcgZmlsZSAtIGdlbmVyYWxseSBpdCBpcyBjb25zdW1lZCB0aHJvdWdoIHRoZSBCYWcgY2xhc3MsIGJ1dFxuLy8gY2FuIGJlIHVzZWZ1bCB0byB1c2UgZGlyZWN0bHkgZm9yIGVmZmljaWVudGx5IGFjY2Vzc2luZyByYXcgcGllY2VzIGZyb21cbi8vIHdpdGhpbiB0aGUgYmFnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWdSZWFkZXIge1xuICBfbGFzdFJlYWRSZXN1bHQ6IENodW5rUmVhZFJlc3VsdDtcbiAgX2ZpbGU6IEZpbGVsaWtlO1xuICBfbGFzdENodW5rSW5mbzogP0NodW5rSW5mbztcblxuICBjb25zdHJ1Y3RvcihmaWxlbGlrZTogRmlsZWxpa2UpIHtcbiAgICB0aGlzLl9maWxlID0gZmlsZWxpa2U7XG4gICAgdGhpcy5fbGFzdENodW5rSW5mbyA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZlcmlmeUJhZ0hlYWRlcihjYWxsYmFjazogQ2FsbGJhY2s8QmFnSGVhZGVyPiwgbmV4dDogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuX2ZpbGUucmVhZCgwLCBIRUFERVJfT0ZGU0VULCAoZXJyb3I6IEVycm9yIHwgbnVsbCwgYnVmZmVyPzogQnVmZmVyKSA9PiB7XG4gICAgICBpZiAoZXJyb3IgfHwgIWJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IgfHwgbmV3IEVycm9yKFwiTWlzc2luZyBib3RoIGVycm9yIGFuZCBidWZmZXJcIikpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZmlsZS5zaXplKCkgPCBIRUFERVJfT0ZGU0VUKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJNaXNzaW5nIGZpbGUgaGVhZGVyLlwiKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWZmZXIudG9TdHJpbmcoKSAhPT0gXCIjUk9TQkFHIFYyLjBcXG5cIikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiQ2Fubm90IGlkZW50aWZ5IGJhZyBmb3JtYXQuXCIpKTtcbiAgICAgIH1cbiAgICAgIG5leHQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlYWRzIHRoZSBoZWFkZXIgYmxvY2sgZnJvbSB0aGUgcm9zYmFnIGZpbGVcbiAgLy8gZ2VuZXJhbGx5IHlvdSBjYWxsIHRoaXMgZmlyc3RcbiAgLy8gYmVjYXVzZSB5b3UgbmVlZCB0aGUgaGVhZGVyIGluZm9ybWF0aW9uIHRvIGNhbGwgcmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvXG4gIHJlYWRIZWFkZXIoY2FsbGJhY2s6IENhbGxiYWNrPEJhZ0hlYWRlcj4pIHtcbiAgICB0aGlzLnZlcmlmeUJhZ0hlYWRlcihjYWxsYmFjaywgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2ZpbGUucmVhZChIRUFERVJfT0ZGU0VULCBIRUFERVJfUkVBREFIRUFELCAoZXJyb3I6IEVycm9yIHwgbnVsbCwgYnVmZmVyPzogQnVmZmVyKSA9PiB7XG4gICAgICAgIGlmIChlcnJvciB8fCAhYnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgYnVmZmVyXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlYWQgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICBpZiAocmVhZCA8IDgpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKGBSZWNvcmQgYXQgcG9zaXRpb24gJHtIRUFERVJfT0ZGU0VUfSBpcyB0cnVuY2F0ZWQuYCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGVhZGVyTGVuZ3RoID0gYnVmZmVyLnJlYWRJbnQzMkxFKDApO1xuICAgICAgICBpZiAocmVhZCA8IGhlYWRlckxlbmd0aCArIDgpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKGBSZWNvcmQgYXQgcG9zaXRpb24gJHtIRUFERVJfT0ZGU0VUfSBoZWFkZXIgdG9vIGxhcmdlOiAke2hlYWRlckxlbmd0aH0uYCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMucmVhZFJlY29yZEZyb21CdWZmZXIoYnVmZmVyLCBIRUFERVJfT0ZGU0VULCBCYWdIZWFkZXIpO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgaGVhZGVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcHJvbWlzaWZpZWQgdmVyc2lvbiBvZiByZWFkSGVhZGVyXG4gIHJlYWRIZWFkZXJBc3luYygpOiBQcm9taXNlPEJhZ0hlYWRlcj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgdGhpcy5yZWFkSGVhZGVyKChlcnI6IEVycm9yIHwgbnVsbCwgaGVhZGVyPzogQmFnSGVhZGVyKSA9PiAoZXJyIHx8ICFoZWFkZXIgPyByZWplY3QoZXJyKSA6IHJlc29sdmUoaGVhZGVyKSkpXG4gICAgKTtcbiAgfVxuXG4gIC8vIHJlYWRzIGNvbm5lY3Rpb24gYW5kIGNodW5rIGluZm9ybWF0aW9uIGZyb20gdGhlIGJhZ1xuICAvLyB5b3UnbGwgZ2VuZXJhbGx5IGNhbGwgdGhpcyBhZnRlciByZWFkaW5nIHRoZSBoZWFkZXIgc28geW91IGNhbiBnZXRcbiAgLy8gY29ubmVjdGlvbiBtZXRhZGF0YSBhbmQgY2h1bmtJbmZvcyB3aGljaCBhbGxvdyB5b3UgdG8gc2VlayB0byBpbmRpdmlkdWFsXG4gIC8vIGNodW5rcyAmIHJlYWQgdGhlbVxuICByZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm8oXG4gICAgZmlsZU9mZnNldDogbnVtYmVyLFxuICAgIGNvbm5lY3Rpb25Db3VudDogbnVtYmVyLFxuICAgIGNodW5rQ291bnQ6IG51bWJlcixcbiAgICBjYWxsYmFjazogQ2FsbGJhY2s8eyBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdLCBjaHVua0luZm9zOiBDaHVua0luZm9bXSB9PlxuICApIHtcbiAgICB0aGlzLl9maWxlLnJlYWQoZmlsZU9mZnNldCwgdGhpcy5fZmlsZS5zaXplKCkgLSBmaWxlT2Zmc2V0LCAoZXJyOiBFcnJvciB8IG51bGwsIGJ1ZmZlcj86IEJ1ZmZlcikgPT4ge1xuICAgICAgaWYgKGVyciB8fCAhYnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIgfHwgbmV3IEVycm9yKFwiTWlzc2luZyBib3RoIGVycm9yIGFuZCBidWZmZXJcIikpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29ubmVjdGlvbkNvdW50ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB7IGNvbm5lY3Rpb25zOiBbXSwgY2h1bmtJbmZvczogW10gfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gdGhpcy5yZWFkUmVjb3Jkc0Zyb21CdWZmZXIoYnVmZmVyLCBjb25uZWN0aW9uQ291bnQsIGZpbGVPZmZzZXQsIENvbm5lY3Rpb24pO1xuICAgICAgY29uc3QgY29ubmVjdGlvbkJsb2NrTGVuZ3RoID0gY29ubmVjdGlvbnNbY29ubmVjdGlvbkNvdW50IC0gMV0uZW5kIC0gY29ubmVjdGlvbnNbMF0ub2Zmc2V0O1xuICAgICAgY29uc3QgY2h1bmtJbmZvcyA9IHRoaXMucmVhZFJlY29yZHNGcm9tQnVmZmVyKFxuICAgICAgICBidWZmZXIuc2xpY2UoY29ubmVjdGlvbkJsb2NrTGVuZ3RoKSxcbiAgICAgICAgY2h1bmtDb3VudCxcbiAgICAgICAgZmlsZU9mZnNldCArIGNvbm5lY3Rpb25CbG9ja0xlbmd0aCxcbiAgICAgICAgQ2h1bmtJbmZvXG4gICAgICApO1xuXG4gICAgICBpZiAoY2h1bmtDb3VudCA+IDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua0NvdW50IC0gMTsgaSsrKSB7XG4gICAgICAgICAgY2h1bmtJbmZvc1tpXS5uZXh0Q2h1bmsgPSBjaHVua0luZm9zW2kgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICBjaHVua0luZm9zW2NodW5rQ291bnQgLSAxXS5uZXh0Q2h1bmsgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgeyBjb25uZWN0aW9ucywgY2h1bmtJbmZvcyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHByb21pc2lmaWVkIHZlcnNpb24gb2YgcmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvXG4gIHJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mb0FzeW5jKFxuICAgIGZpbGVPZmZzZXQ6IG51bWJlcixcbiAgICBjb25uZWN0aW9uQ291bnQ6IG51bWJlcixcbiAgICBjaHVua0NvdW50OiBudW1iZXJcbiAgKTogUHJvbWlzZTx7IGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW10sIGNodW5rSW5mb3M6IENodW5rSW5mb1tdIH0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5yZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm8oXG4gICAgICAgIGZpbGVPZmZzZXQsXG4gICAgICAgIGNvbm5lY3Rpb25Db3VudCxcbiAgICAgICAgY2h1bmtDb3VudCxcbiAgICAgICAgKGVycjogRXJyb3IgfCBudWxsLCByZXN1bHQ/OiB7IGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW10sIGNodW5rSW5mb3M6IENodW5rSW5mb1tdIH0pID0+XG4gICAgICAgICAgZXJyIHx8ICFyZXN1bHQgPyByZWplY3QoZXJyKSA6IHJlc29sdmUocmVzdWx0KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlYWQgaW5kaXZpZHVhbCByYXcgbWVzc2FnZXMgZnJvbSB0aGUgYmFnIGF0IGEgZ2l2ZW4gY2h1bmtcbiAgLy8gZmlsdGVycyB0byBhIHNwZWNpZmljIHNldCBvZiBjb25uZWN0aW9uIGlkcywgc3RhcnQgdGltZSwgJiBlbmQgdGltZVxuICAvLyBnZW5lcmFsbHkgdGhlIHJlY29yZHMgd2lsbCBiZSBvZiB0eXBlIE1lc3NhZ2VEYXRhXG4gIHJlYWRDaHVua01lc3NhZ2VzKFxuICAgIGNodW5rSW5mbzogQ2h1bmtJbmZvLFxuICAgIGNvbm5lY3Rpb25zOiBudW1iZXJbXSxcbiAgICBzdGFydFRpbWU6IFRpbWUgfCBudWxsLFxuICAgIGVuZFRpbWU6IFRpbWUgfCBudWxsLFxuICAgIGRlY29tcHJlc3M6IERlY29tcHJlc3MsXG4gICAgY2FsbGJhY2s6IENhbGxiYWNrPE1lc3NhZ2VEYXRhW10+XG4gICkge1xuICAgIGNvbnN0IHN0YXJ0ID0gc3RhcnRUaW1lIHx8IHsgc2VjOiAwLCBuc2VjOiAwIH07XG4gICAgY29uc3QgZW5kID0gZW5kVGltZSB8fCB7IHNlYzogTnVtYmVyLk1BWF9WQUxVRSwgbnNlYzogTnVtYmVyLk1BWF9WQUxVRSB9O1xuICAgIGNvbnN0IGNvbm5zID1cbiAgICAgIGNvbm5lY3Rpb25zIHx8XG4gICAgICBjaHVua0luZm8uY29ubmVjdGlvbnMubWFwKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uLmNvbm47XG4gICAgICB9KTtcblxuICAgIHRoaXMucmVhZENodW5rKGNodW5rSW5mbywgZGVjb21wcmVzcywgKGVycm9yOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IENodW5rUmVhZFJlc3VsdCkgPT4ge1xuICAgICAgaWYgKGVycm9yIHx8ICFyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgcmVzdWx0XCIpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2h1bmsgPSByZXN1bHQuY2h1bms7XG4gICAgICBjb25zdCBpbmRpY2VzOiB7IFtjb25uOiBudW1iZXJdOiBJbmRleERhdGEgfSA9IHt9O1xuICAgICAgcmVzdWx0LmluZGljZXMuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgICAgaW5kaWNlc1tpbmRleC5jb25uXSA9IGluZGV4O1xuICAgICAgfSk7XG4gICAgICBjb25zdCBwcmVzZW50Q29ubmVjdGlvbnMgPSBjb25ucy5maWx0ZXIoKGNvbm4pID0+IHtcbiAgICAgICAgcmV0dXJuIGluZGljZXNbY29ubl0gIT09IHVuZGVmaW5lZDtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaXRlcmFibGVzID0gcHJlc2VudENvbm5lY3Rpb25zLm1hcCgoY29ubikgPT4ge1xuICAgICAgICAvLyAkRmxvd0ZpeE1lIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xMTYzXG4gICAgICAgIHJldHVybiBpbmRpY2VzW2Nvbm5dLmluZGljZXNbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vbWVzc2FnZXMgc2hvdWxkIGJlIG1lcmdlIGJ5IGZpbGUgb2Zmc2V0IHNvIHRoZSBtZXNzYWdlcyBhcmUgcmVwbGF5ZWQgaW5cbiAgICAgIC8vIHRoZWlyIG9yaWdpbmFsIG9yZGVyLCBzaW1pbGFyIHRvICdyb3NiYWcgcGxheSdcbiAgICAgIGNvbnN0IGl0ZXIgPSBubWVyZ2UoKGEsIGIpID0+IGEub2Zmc2V0IC0gYi5vZmZzZXQsIC4uLml0ZXJhYmxlcyk7XG5cbiAgICAgIGNvbnN0IGVudHJpZXMgPSBbXTtcbiAgICAgIGxldCBpdGVtID0gaXRlci5uZXh0KCk7XG4gICAgICB3aGlsZSAoIWl0ZW0uZG9uZSkge1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBpdGVtO1xuICAgICAgICBpdGVtID0gaXRlci5uZXh0KCk7XG4gICAgICAgIGlmICghdmFsdWUgfHwgVGltZVV0aWwuaXNHcmVhdGVyVGhhbihzdGFydCwgdmFsdWUudGltZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVGltZVV0aWwuaXNHcmVhdGVyVGhhbih2YWx1ZS50aW1lLCBlbmQpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZW50cmllcy5wdXNoKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBlbnRyaWVzLm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZFJlY29yZEZyb21CdWZmZXIoY2h1bmsuZGF0YS5zbGljZShlbnRyeS5vZmZzZXQpLCBjaHVuay5kYXRhT2Zmc2V0LCBNZXNzYWdlRGF0YSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIG1lc3NhZ2VzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHByb21pc2lmaWVkIHZlcnNpb24gb2YgcmVhZENodW5rTWVzc2FnZXNcbiAgcmVhZENodW5rTWVzc2FnZXNBc3luYyhcbiAgICBjaHVua0luZm86IENodW5rSW5mbyxcbiAgICBjb25uZWN0aW9uczogbnVtYmVyW10sXG4gICAgc3RhcnRUaW1lOiBUaW1lLFxuICAgIGVuZFRpbWU6IFRpbWUsXG4gICAgZGVjb21wcmVzczogRGVjb21wcmVzc1xuICApOiBQcm9taXNlPE1lc3NhZ2VEYXRhW10+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5yZWFkQ2h1bmtNZXNzYWdlcyhcbiAgICAgICAgY2h1bmtJbmZvLFxuICAgICAgICBjb25uZWN0aW9ucyxcbiAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICBlbmRUaW1lLFxuICAgICAgICBkZWNvbXByZXNzLFxuICAgICAgICAoZXJyOiBFcnJvciB8IG51bGwsIG1lc3NhZ2VzPzogTWVzc2FnZURhdGFbXSkgPT4gKGVyciB8fCAhbWVzc2FnZXMgPyByZWplY3QoZXJyKSA6IHJlc29sdmUobWVzc2FnZXMpKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlYWRzIGEgc2luZ2xlIGNodW5rIHJlY29yZCAmJiBpdHMgaW5kZXggcmVjb3JkcyBnaXZlbiBhIGNodW5rSW5mb1xuICByZWFkQ2h1bmsoY2h1bmtJbmZvOiBDaHVua0luZm8sIGRlY29tcHJlc3M6IERlY29tcHJlc3MsIGNhbGxiYWNrOiBDYWxsYmFjazxDaHVua1JlYWRSZXN1bHQ+KSB7XG4gICAgLy8gaWYgd2UncmUgcmVhZGluZyB0aGUgc2FtZSBjaHVuayBhIHNlY29uZCB0aW1lIHJldHVybiB0aGUgY2FjaGVkIHZlcnNpb25cbiAgICAvLyB0byBhdm9pZCBkb2luZyBkZWNvbXByZXNzaW9uIG9uIHRoZSBzYW1lIGNodW5rIG11bHRpcGxlIHRpbWVzIHdoaWNoIGlzXG4gICAgLy8gZXhwZW5zaXZlXG4gICAgaWYgKGNodW5rSW5mbyA9PT0gdGhpcy5fbGFzdENodW5rSW5mbyAmJiB0aGlzLl9sYXN0UmVhZFJlc3VsdCkge1xuICAgICAgLy8gYWx3YXlzIGNhbGxiYWNrIGFzeW5jLCBldmVuIGlmIHdlIGhhdmUgdGhlIHJlc3VsdFxuICAgICAgLy8gaHR0cHM6Ly9vcmVuLmdpdGh1Yi5pby9ibG9nL3phbGdvLmh0bWxcbiAgICAgIGNvbnN0IGxhc3RSZWFkUmVzdWx0ID0gdGhpcy5fbGFzdFJlYWRSZXN1bHQ7XG4gICAgICByZXR1cm4gc2V0SW1tZWRpYXRlKCgpID0+IGNhbGxiYWNrKG51bGwsIGxhc3RSZWFkUmVzdWx0KSk7XG4gICAgfVxuICAgIGNvbnN0IHsgbmV4dENodW5rIH0gPSBjaHVua0luZm87XG5cbiAgICBjb25zdCByZWFkTGVuZ3RoID0gbmV4dENodW5rXG4gICAgICA/IG5leHRDaHVuay5jaHVua1Bvc2l0aW9uIC0gY2h1bmtJbmZvLmNodW5rUG9zaXRpb25cbiAgICAgIDogdGhpcy5fZmlsZS5zaXplKCkgLSBjaHVua0luZm8uY2h1bmtQb3NpdGlvbjtcblxuICAgIHRoaXMuX2ZpbGUucmVhZChjaHVua0luZm8uY2h1bmtQb3NpdGlvbiwgcmVhZExlbmd0aCwgKGVycjogRXJyb3IgfCBudWxsLCBidWZmZXI/OiBCdWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIgfHwgIWJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgYnVmZmVyXCIpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLnJlYWRSZWNvcmRGcm9tQnVmZmVyKGJ1ZmZlciwgY2h1bmtJbmZvLmNodW5rUG9zaXRpb24sIENodW5rKTtcbiAgICAgIGNvbnN0IHsgY29tcHJlc3Npb24gfSA9IGNodW5rO1xuICAgICAgaWYgKGNvbXByZXNzaW9uICE9PSBcIm5vbmVcIikge1xuICAgICAgICBjb25zdCBkZWNvbXByZXNzRm4gPSBkZWNvbXByZXNzW2NvbXByZXNzaW9uXTtcbiAgICAgICAgaWYgKCFkZWNvbXByZXNzRm4pIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKGBVbnN1cHBvcnRlZCBjb21wcmVzc2lvbiB0eXBlICR7Y2h1bmsuY29tcHJlc3Npb259YCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRlY29tcHJlc3NGbihjaHVuay5kYXRhLCBjaHVuay5zaXplKTtcbiAgICAgICAgY2h1bmsuZGF0YSA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZGljZXMgPSB0aGlzLnJlYWRSZWNvcmRzRnJvbUJ1ZmZlcihcbiAgICAgICAgYnVmZmVyLnNsaWNlKGNodW5rLmxlbmd0aCksXG4gICAgICAgIGNodW5rSW5mby5jb3VudCxcbiAgICAgICAgY2h1bmtJbmZvLmNodW5rUG9zaXRpb24gKyBjaHVuay5sZW5ndGgsXG4gICAgICAgIEluZGV4RGF0YVxuICAgICAgKTtcblxuICAgICAgdGhpcy5fbGFzdENodW5rSW5mbyA9IGNodW5rSW5mbztcbiAgICAgIHRoaXMuX2xhc3RSZWFkUmVzdWx0ID0geyBjaHVuaywgaW5kaWNlcyB9O1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHRoaXMuX2xhc3RSZWFkUmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlYWRzIGNvdW50IHJlY29yZHMgZnJvbSBhIGJ1ZmZlciBzdGFydGluZyBhdCBmaWxlT2Zmc2V0XG4gIHJlYWRSZWNvcmRzRnJvbUJ1ZmZlcjxUOiBSZWNvcmQ+KFxuICAgIGJ1ZmZlcjogQnVmZmVyLFxuICAgIGNvdW50OiBudW1iZXIsXG4gICAgZmlsZU9mZnNldDogbnVtYmVyLFxuICAgIGNsczogQ2xhc3M8VD4gJiB7IG9wY29kZTogbnVtYmVyIH1cbiAgKTogVFtdIHtcbiAgICBjb25zdCByZWNvcmRzID0gW107XG4gICAgbGV0IGJ1ZmZlck9mZnNldCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCByZWNvcmQgPSB0aGlzLnJlYWRSZWNvcmRGcm9tQnVmZmVyKGJ1ZmZlci5zbGljZShidWZmZXJPZmZzZXQpLCBmaWxlT2Zmc2V0ICsgYnVmZmVyT2Zmc2V0LCBjbHMpO1xuICAgICAgYnVmZmVyT2Zmc2V0ICs9IHJlY29yZC5lbmQgLSByZWNvcmQub2Zmc2V0O1xuICAgICAgcmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gICAgfVxuICAgIHJldHVybiByZWNvcmRzO1xuICB9XG5cbiAgLy8gcmVhZCBhbiBpbmRpdmlkdWFsIHJlY29yZCBmcm9tIGEgYnVmZmVyXG4gIHJlYWRSZWNvcmRGcm9tQnVmZmVyPFQ6IFJlY29yZD4oYnVmZmVyOiBCdWZmZXIsIGZpbGVPZmZzZXQ6IG51bWJlciwgY2xzOiBDbGFzczxUPiAmIHsgb3Bjb2RlOiBudW1iZXIgfSk6IFQge1xuICAgIGNvbnN0IGhlYWRlckxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRSgwKTtcbiAgICBjb25zdCByZWNvcmQgPSBwYXJzZUhlYWRlcihidWZmZXIuc2xpY2UoNCwgNCArIGhlYWRlckxlbmd0aCksIGNscyk7XG5cbiAgICBjb25zdCBkYXRhT2Zmc2V0ID0gNCArIGhlYWRlckxlbmd0aCArIDQ7XG4gICAgY29uc3QgZGF0YUxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRSg0ICsgaGVhZGVyTGVuZ3RoKTtcbiAgICBjb25zdCBkYXRhID0gYnVmZmVyLnNsaWNlKGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBkYXRhTGVuZ3RoKTtcblxuICAgIHJlY29yZC5wYXJzZURhdGEoZGF0YSk7XG5cbiAgICByZWNvcmQub2Zmc2V0ID0gZmlsZU9mZnNldDtcbiAgICByZWNvcmQuZGF0YU9mZnNldCA9IHJlY29yZC5vZmZzZXQgKyA0ICsgaGVhZGVyTGVuZ3RoICsgNDtcbiAgICByZWNvcmQuZW5kID0gcmVjb3JkLmRhdGFPZmZzZXQgKyBkYXRhTGVuZ3RoO1xuICAgIHJlY29yZC5sZW5ndGggPSByZWNvcmQuZW5kIC0gcmVjb3JkLm9mZnNldDtcblxuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCBpbnQ1MyBmcm9tIFwiaW50NTNcIjtcbmltcG9ydCB7IGV4dHJhY3RUaW1lIH0gZnJvbSBcIi4vZmllbGRzXCI7XG5pbXBvcnQgeyBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uLCB0eXBlIFJvc01zZ0RlZmluaXRpb24sIHR5cGUgTmFtZWRSb3NNc2dEZWZpbml0aW9uIH0gZnJvbSBcIi4vcGFyc2VNZXNzYWdlRGVmaW5pdGlvblwiO1xuXG50eXBlIFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IChcbiAgYnVmZmVyOiBBcnJheUJ1ZmZlcixcbiAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICBsZW5ndGg6IG51bWJlclxuKSA9PlxuICB8IEludDhBcnJheVxuICB8IFVpbnQ4QXJyYXlcbiAgfCBJbnQxNkFycmF5XG4gIHwgVWludDE2QXJyYXlcbiAgfCBJbnQzMkFycmF5XG4gIHwgVWludDMyQXJyYXlcbiAgfCBVaW50OENsYW1wZWRBcnJheVxuICB8IEZsb2F0MzJBcnJheVxuICB8IEZsb2F0NjRBcnJheTtcblxuLy8gdGhpcyBoYXMgaGFyZC1jb2RlZCBidWZmZXIgcmVhZGluZyBmdW5jdGlvbnMgZm9yIGVhY2hcbi8vIG9mIHRoZSBzdGFuZGFyZCBtZXNzYWdlIHR5cGVzIGh0dHA6Ly9kb2NzLnJvcy5vcmcvYXBpL3N0ZF9tc2dzL2h0bWwvaW5kZXgtbXNnLmh0bWxcbi8vIGV2ZW50dWFsbHkgY3VzdG9tIHR5cGVzIGRlY29tcG9zZSBpbnRvIHRoZXNlIHN0YW5kYXJkIHR5cGVzXG5jbGFzcyBTdGFuZGFyZFR5cGVSZWFkZXIge1xuICBidWZmZXI6IEJ1ZmZlcjtcbiAgb2Zmc2V0OiBudW1iZXI7XG4gIHZpZXc6IERhdGFWaWV3O1xuXG4gIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMudmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIuYnVmZmVyLCBidWZmZXIuYnl0ZU9mZnNldCk7XG4gIH1cblxuICBzdHJpbmcoKSB7XG4gICAgY29uc3QgbGVuID0gdGhpcy5pbnQzMigpO1xuICAgIGNvbnN0IGNvZGVQb2ludHMgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlci5idWZmZXIsIHRoaXMuYnVmZmVyLmJ5dGVPZmZzZXQgKyB0aGlzLm9mZnNldCwgbGVuKTtcbiAgICB0aGlzLm9mZnNldCArPSBsZW47XG4gICAgLy8gaWYgdGhlIHN0cmluZyBpcyByZWxhdGl2ZWx5IHNob3J0IHdlIGNhbiB1c2UgYXBwbHlcbiAgICAvLyBidXQgdmVyeSBsb25nIHN0cmluZ3MgY2FuIGNhdXNlIGEgc3RhY2sgb3ZlcmZsb3cgZHVlIHRvIHRvbyBtYW55IGFyZ3VtZW50c1xuICAgIC8vIGluIHRob3NlIGNhc2VzIHJldmVydCB0byBhIHNsb3dlciBpdHRlcmF0aXZlIHN0cmluZyBidWlsZGluZyBhcHByb2FjaFxuICAgIGlmIChjb2RlUG9pbnRzLmxlbmd0aCA8IDEwMDApIHtcbiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGNvZGVQb2ludHMpO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBkYXRhICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYm9vbCgpIHtcbiAgICByZXR1cm4gdGhpcy51aW50OCgpICE9PSAwO1xuICB9XG5cbiAgaW50OCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEludDgodGhpcy5vZmZzZXQrKyk7XG4gIH1cblxuICB1aW50OCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldFVpbnQ4KHRoaXMub2Zmc2V0KyspO1xuICB9XG5cbiAgdHlwZWRBcnJheShsZW46ID9udW1iZXIsIGFycmF5VHlwZTogVHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XG4gICAgY29uc3QgYXJyYXlMZW5ndGggPSBsZW4gPT0gbnVsbCA/IHRoaXMudWludDMyKCkgOiBsZW47XG4gICAgY29uc3QgZGF0YSA9IG5ldyBhcnJheVR5cGUodGhpcy52aWV3LmJ1ZmZlciwgdGhpcy5vZmZzZXQgKyB0aGlzLnZpZXcuYnl0ZU9mZnNldCwgYXJyYXlMZW5ndGgpO1xuICAgIHRoaXMub2Zmc2V0ICs9IGFycmF5TGVuZ3RoO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBpbnQxNigpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0SW50MTYodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHVpbnQxNigpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0VWludDE2KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpbnQzMigpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0SW50MzIodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHVpbnQzMigpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0VWludDMyKHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmbG9hdDMyKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRGbG9hdDMyKHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmbG9hdDY0KCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRGbG9hdDY0KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpbnQ2NCgpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiBpbnQ1My5yZWFkSW50NjRMRSh0aGlzLmJ1ZmZlciwgb2Zmc2V0KTtcbiAgfVxuXG4gIHVpbnQ2NCgpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiBpbnQ1My5yZWFkVUludDY0TEUodGhpcy5idWZmZXIsIG9mZnNldCk7XG4gIH1cblxuICB0aW1lKCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgcmV0dXJuIGV4dHJhY3RUaW1lKHRoaXMuYnVmZmVyLCBvZmZzZXQpO1xuICB9XG5cbiAgZHVyYXRpb24oKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gZXh0cmFjdFRpbWUodGhpcy5idWZmZXIsIG9mZnNldCk7XG4gIH1cbn1cblxuY29uc3QgZmluZFR5cGVCeU5hbWUgPSAodHlwZXM6IFJvc01zZ0RlZmluaXRpb25bXSwgbmFtZSA9IFwiXCIpOiBOYW1lZFJvc01zZ0RlZmluaXRpb24gPT4ge1xuICBsZXQgZm91bmROYW1lID0gXCJcIjsgLy8gdHJhY2sgbmFtZSBzZXBhcmF0ZWx5IGluIGEgbm9uLW51bGwgdmFyaWFibGUgdG8gYXBwZWFzZSBGbG93XG4gIGNvbnN0IG1hdGNoZXMgPSB0eXBlcy5maWx0ZXIoKHR5cGUpID0+IHtcbiAgICBjb25zdCB0eXBlTmFtZSA9IHR5cGUubmFtZSB8fCBcIlwiO1xuICAgIC8vIGlmIHRoZSBzZWFyY2ggaXMgZW1wdHksIHJldHVybiB1bm5hbWVkIHR5cGVzXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICByZXR1cm4gIXR5cGVOYW1lO1xuICAgIH1cbiAgICAvLyByZXR1cm4gaWYgdGhlIHNlYXJjaCBpcyBpbiB0aGUgdHlwZSBuYW1lXG4gICAgLy8gb3IgbWF0Y2hlcyBleGFjdGx5IGlmIGEgZnVsbHktcXVhbGlmaWVkIG5hbWUgbWF0Y2ggaXMgcGFzc2VkIHRvIHVzXG4gICAgY29uc3QgbmFtZUVuZCA9IG5hbWUuaW5kZXhPZihcIi9cIikgPiAtMSA/IG5hbWUgOiBgLyR7bmFtZX1gO1xuICAgIGlmICh0eXBlTmFtZS5lbmRzV2l0aChuYW1lRW5kKSkge1xuICAgICAgZm91bmROYW1lID0gdHlwZU5hbWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAxIHRvcCBsZXZlbCB0eXBlIGRlZmluaXRpb24gZm9yICcke25hbWV9JyBidXQgZm91bmQgJHttYXRjaGVzLmxlbmd0aH1gKTtcbiAgfVxuICByZXR1cm4geyAuLi5tYXRjaGVzWzBdLCBuYW1lOiBmb3VuZE5hbWUgfTtcbn07XG5cbmNvbnN0IGNvbnN0cnVjdG9yQm9keSA9ICh0eXBlOiAkUmVhZE9ubHk8Um9zTXNnRGVmaW5pdGlvbj4pID0+IHtcbiAgcmV0dXJuIHR5cGUuZGVmaW5pdGlvbnNcbiAgICAuZmlsdGVyKChkZWYpID0+ICFkZWYuaXNDb25zdGFudClcbiAgICAubWFwKChkZWYpID0+IHtcbiAgICAgIHJldHVybiBgdGhpcy4ke2RlZi5uYW1lfSA9IHVuZGVmaW5lZGA7XG4gICAgfSlcbiAgICAuam9pbihcIjtcXG5cIik7XG59O1xuXG5jb25zdCBmcmllbmRseU5hbWUgPSAobmFtZTogc3RyaW5nKSA9PiBuYW1lLnJlcGxhY2UoXCIvXCIsIFwiX1wiKTtcblxuY29uc3QgY3JlYXRlUGFyc2VyID0gKHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10pID0+IHtcbiAgY29uc3QgdW5uYW1lZFR5cGVzID0gdHlwZXMuZmlsdGVyKCh0eXBlKSA9PiAhdHlwZS5uYW1lKTtcbiAgaWYgKHVubmFtZWRUeXBlcy5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtdWx0aXBsZSB1bm5hbWVkIHR5cGVzXCIpO1xuICB9XG5cbiAgY29uc3QgW3VubmFtZWRUeXBlXSA9IHVubmFtZWRUeXBlcztcblxuICBjb25zdCBuYW1lZFR5cGVzOiBOYW1lZFJvc01zZ0RlZmluaXRpb25bXSA9ICh0eXBlcy5maWx0ZXIoKHR5cGUpID0+ICEhdHlwZS5uYW1lKTogYW55W10pO1xuXG4gIGxldCBqcyA9IGBcbiAgdmFyIFJlY29yZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAke2NvbnN0cnVjdG9yQm9keSh1bm5hbWVkVHlwZSl9XG4gIH07XFxuYDtcblxuICBuYW1lZFR5cGVzLmZvckVhY2goKHQpID0+IHtcbiAgICBqcyArPSBgXG5SZWNvcmQuJHtmcmllbmRseU5hbWUodC5uYW1lKX0gPSBmdW5jdGlvbigpIHtcbiAgJHtjb25zdHJ1Y3RvckJvZHkodCl9XG59O1xcbmA7XG4gIH0pO1xuXG4gIGxldCBzdGFjayA9IDA7XG4gIGNvbnN0IGdldFJlYWRlckxpbmVzID0gKHR5cGU6IFJvc01zZ0RlZmluaXRpb24gfCBOYW1lZFJvc01zZ0RlZmluaXRpb24sIGZpZWxkTmFtZSA9IFwicmVjb3JkXCIpID0+IHtcbiAgICBsZXQgcmVhZGVyTGluZXM6IHN0cmluZ1tdID0gW107XG4gICAgdHlwZS5kZWZpbml0aW9ucy5mb3JFYWNoKChkZWYpID0+IHtcbiAgICAgIGlmIChkZWYuaXNDb25zdGFudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZGVmLmlzQXJyYXkpIHtcbiAgICAgICAgaWYgKGRlZi50eXBlID09PSBcInVpbnQ4XCIgfHwgZGVmLnR5cGUgPT09IFwiaW50OFwiKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlUeXBlID0gZGVmLnR5cGUgPT09IFwidWludDhcIiA/IFwiVWludDhBcnJheVwiIDogXCJJbnQ4QXJyYXlcIjtcbiAgICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGAke2ZpZWxkTmFtZX0uJHtkZWYubmFtZX0gPSByZWFkZXIudHlwZWRBcnJheSgke1N0cmluZyhkZWYuYXJyYXlMZW5ndGgpfSwgJHthcnJheVR5cGV9KTtgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gYmVjYXVzZSB3ZSBtaWdodCBoYXZlIG5lc3RlZCBhcnJheXNcbiAgICAgICAgLy8gd2UgbmVlZCB0byBpbmNyZW1lbnRhbGx5IG51bWJlciB2YXJhaWJsZXMgc28gdGhleSBhcmVuJ3RcbiAgICAgICAgLy8gc3RvbXBlZCBvbiBieSBvdGhlciB2YXJpYWJsZXMgaW4gdGhlIGZ1bmN0aW9uXG4gICAgICAgIHN0YWNrKys7XG5cbiAgICAgICAgLy8gbmFtZSBmb3IgdGhlIGxlbmd0aCBmaWVsZCBpbiB0aGUgZm9yLWxvb3BcbiAgICAgICAgY29uc3QgbGVuRmllbGQgPSBgbGVuZ3RoXyR7c3RhY2t9YDtcbiAgICAgICAgLy8gbmFtZSBmb3IgYSBjaGlsZCBjb2xsZWN0aW9uXG4gICAgICAgIGNvbnN0IGNoaWxkTmFtZSA9IGBjcGx4XyR7c3RhY2t9YDtcbiAgICAgICAgLy8gbmFtZSB0byB0aGUgaXR0ZXJhdG9yIGluIHRoZSBmb3ItbG9vcFxuICAgICAgICBjb25zdCBpbmNOYW1lID0gYCR7Y2hpbGROYW1lfV9pbmNfJHtzdGFja31gO1xuXG4gICAgICAgIC8vIHNldCBhIHZhcmlhYmxlIHBvaW50aW5nIHRvIHRoZSBwYXJzZWQgZml4ZWQgYXJyYXkgbGVuZ3RoXG4gICAgICAgIC8vIG9yIHJlYWQgdGhlIGJ5dGUgaW5kaWNhdGluZyB0aGUgZHluYW1pYyBsZW5ndGhcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgdmFyICR7bGVuRmllbGR9ID0gJHtkZWYuYXJyYXlMZW5ndGggPyBkZWYuYXJyYXlMZW5ndGggOiBcInJlYWRlci51aW50MzIoKTtcIn1gKTtcblxuICAgICAgICAvLyBvbmx5IGFsbG9jYXRlIGFuIGFycmF5IGlmIHRoZXJlIGlzIGEgbGVuZ3RoIC0gc2tpcHMgZW1wdHkgYWxsb2NhdGlvbnNcbiAgICAgICAgY29uc3QgYXJyYXlOYW1lID0gYCR7ZmllbGROYW1lfS4ke2RlZi5uYW1lfWA7XG5cbiAgICAgICAgLy8gYWxsb2NhdGUgdGhlIG5ldyBhcnJheSB0byBhIGZpeGVkIGxlbmd0aCBzaW5jZSB3ZSBrbm93IGl0IGFoZWFkIG9mIHRpbWVcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgJHthcnJheU5hbWV9ID0gbmV3IEFycmF5KCR7bGVuRmllbGR9KWApO1xuICAgICAgICAvLyBzdGFydCB0aGUgZm9yLWxvb3BcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgZm9yICh2YXIgJHtpbmNOYW1lfSA9IDA7ICR7aW5jTmFtZX0gPCAke2xlbkZpZWxkfTsgJHtpbmNOYW1lfSsrKSB7YCk7XG4gICAgICAgIC8vIGlmIHRoZSBzdWIgdHlwZSBpcyBjb21wbGV4IHdlIG5lZWQgdG8gYWxsb2NhdGUgaXQgYW5kIHBhcnNlIGl0cyB2YWx1ZXNcbiAgICAgICAgaWYgKGRlZi5pc0NvbXBsZXgpIHtcbiAgICAgICAgICBjb25zdCBkZWZUeXBlID0gZmluZFR5cGVCeU5hbWUodHlwZXMsIGRlZi50eXBlKTtcbiAgICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGB2YXIgJHtjaGlsZE5hbWV9ID0gbmV3IFJlY29yZC4ke2ZyaWVuZGx5TmFtZShkZWZUeXBlLm5hbWUpfSgpO2ApO1xuICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGdlbmVyYXRlIHRoZSBwYXJzZSBpbnN0cnVjdGlvbnMgZm9yIHRoZSBzdWItdHlwZVxuICAgICAgICAgIHJlYWRlckxpbmVzID0gcmVhZGVyTGluZXMuY29uY2F0KGdldFJlYWRlckxpbmVzKGRlZlR5cGUsIGAke2NoaWxkTmFtZX1gKSk7XG4gICAgICAgICAgcmVhZGVyTGluZXMucHVzaChgJHthcnJheU5hbWV9WyR7aW5jTmFtZX1dID0gJHtjaGlsZE5hbWV9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgdGhlIHN1YnR5cGUgaXMgbm90IGNvbXBsZXggaXRzIGEgc2ltcGxlIGxvdy1sZXZlbCByZWFkZXIgb3BlcmF0aW9uXG4gICAgICAgICAgcmVhZGVyTGluZXMucHVzaChgJHthcnJheU5hbWV9WyR7aW5jTmFtZX1dID0gcmVhZGVyLiR7ZGVmLnR5cGV9KCk7YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChcIn1cIik7IC8vIGNsb3NlIHRoZSBmb3ItbG9vcFxuICAgICAgfSBlbHNlIGlmIChkZWYuaXNDb21wbGV4KSB7XG4gICAgICAgIGNvbnN0IGRlZlR5cGUgPSBmaW5kVHlwZUJ5TmFtZSh0eXBlcywgZGVmLnR5cGUpO1xuICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGAke2ZpZWxkTmFtZX0uJHtkZWYubmFtZX0gPSBuZXcgUmVjb3JkLiR7ZnJpZW5kbHlOYW1lKGRlZlR5cGUubmFtZSl9KCk7YCk7XG4gICAgICAgIHJlYWRlckxpbmVzID0gcmVhZGVyTGluZXMuY29uY2F0KGdldFJlYWRlckxpbmVzKGRlZlR5cGUsIGAke2ZpZWxkTmFtZX0uJHtkZWYubmFtZX1gKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGAke2ZpZWxkTmFtZX0uJHtkZWYubmFtZX0gPSByZWFkZXIuJHtkZWYudHlwZX0oKTtgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVhZGVyTGluZXM7XG4gIH07XG5cbiAgY29uc3QgbGluZXMgPSBnZXRSZWFkZXJMaW5lcyh1bm5hbWVkVHlwZSkuam9pbihcIlxcblwiKTtcbiAgY29uc3QgcmVhZGVyRm4gPSBgXG4gIHJldHVybiBmdW5jdGlvbiByZWFkKHJlYWRlcikge1xuICAgIHZhciByZWNvcmQgPSBuZXcgUmVjb3JkKCk7XG4gICAgJHtsaW5lc31cbiAgICByZXR1cm4gcmVjb3JkO1xuICB9O2A7XG5cbiAganMgKz0gcmVhZGVyRm47XG5cbiAgbGV0IF9yZWFkOiAocmVhZGVyOiBTdGFuZGFyZFR5cGVSZWFkZXIpID0+IGFueTtcbiAgdHJ5IHtcbiAgICBfcmVhZCA9IGV2YWwoYChmdW5jdGlvbiBidWlsZFJlYWRlcigpIHsgJHtqc30gfSkoKWApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcImVycm9yIGJ1aWxkaW5nIHBhcnNlcjpcIiwganMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgdGhyb3cgZTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihidWZmZXI6IEJ1ZmZlcikge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBTdGFuZGFyZFR5cGVSZWFkZXIoYnVmZmVyKTtcbiAgICByZXR1cm4gX3JlYWQocmVhZGVyKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlUmVhZGVyIHtcbiAgcmVhZGVyOiAoYnVmZmVyOiBCdWZmZXIpID0+IGFueTtcblxuICAvLyB0YWtlcyBhIG11bHRpLWxpbmUgc3RyaW5nIG1lc3NhZ2UgZGVmaW5pdGlvbiBhbmQgcmV0dXJuc1xuICAvLyBhIG1lc3NhZ2UgcmVhZGVyIHdoaWNoIGNhbiBiZSB1c2VkIHRvIHJlYWQgbWVzc2FnZXMgYmFzZWRcbiAgLy8gb24gdGhlIG1lc3NhZ2UgZGVmaW5pdGlvblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlRGVmaW5pdGlvbjogc3RyaW5nKSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbnMgPSBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uKG1lc3NhZ2VEZWZpbml0aW9uKTtcbiAgICB0aGlzLnJlYWRlciA9IGNyZWF0ZVBhcnNlcihkZWZpbml0aW9ucyk7XG4gIH1cblxuICByZWFkTWVzc2FnZShidWZmZXI6IEJ1ZmZlcikge1xuICAgIHJldHVybiB0aGlzLnJlYWRlcihidWZmZXIpO1xuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgR00gQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vLyByZXByZXNlbnRzIGEgcmVzdWx0IHBhc3NlZCB0byB0aGUgY2FsbGJhY2sgZnJvbSB0aGUgaGlnaC1sZXZlbCBjYWxsOlxuLy8gYmFnLnJlYWRNZXNzYWdlcyh7IG9wdHM6IGFueSB9LCBjYWxsYmFjazogKFJlYWRSZXN1bHQpID0+IHZvaWQpID0+IFByb21pc2U8dm9pZD5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWRSZXN1bHQ8VD4ge1xuICB0b3BpYzogc3RyaW5nO1xuICBtZXNzYWdlOiBUO1xuICB0aW1lc3RhbXA6IFRpbWU7XG4gIGRhdGE6IEJ1ZmZlcjtcbiAgY2h1bmtPZmZzZXQ6IG51bWJlcjtcbiAgdG90YWxDaHVua3M6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih0b3BpYzogc3RyaW5nLCBtZXNzYWdlOiBULCB0aW1lc3RhbXA6IFRpbWUsIGRhdGE6IEJ1ZmZlciwgY2h1bmtPZmZzZXQ6IG51bWJlciwgdG90YWxDaHVua3M6IG51bWJlcikge1xuICAgIC8vIHN0cmluZzogdGhlIHRvcGljIHRoZSBtZXNzYWdlIHdhcyBvblxuICAgIHRoaXMudG9waWMgPSB0b3BpYztcblxuICAgIC8vIGFueTogdGhlIHBhcnNlZCBib2R5IG9mIHRoZSBtZXNzYWdlIGJhc2VkIG9uIGNvbm5lY3Rpb24ubWVzc2FnZURlZmluaXRpb25cbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgLy8gdGltZTogdGhlIHRpbWVzdGFtcCBvZiB0aGUgbWVzc2FnZVxuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuXG4gICAgLy8gYnVmZmVyOiByYXcgYnVmZmVyIGRhdGEgb2YgdGhlIG1lc3NhZ2VcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgLy8gdGhlIG9mZnNldCBvZiB0aGUgY3VycmVudGx5IHJlYWQgY2h1bmtcbiAgICB0aGlzLmNodW5rT2Zmc2V0ID0gY2h1bmtPZmZzZXQ7XG5cbiAgICAvLyB0aGUgdG90YWwgbnVtYmVyIG9mIGNodW5rcyBpbiB0aGUgcmVhZCBvcGVyYXRpb25cbiAgICB0aGlzLnRvdGFsQ2h1bmtzID0gdG90YWxDaHVua3M7XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRGF0ZShkYXRlOiBEYXRlKSB7XG4gIGNvbnN0IHNlYyA9IE1hdGguZmxvb3IoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgY29uc3QgbnNlYyA9IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgKiAxZTY7XG4gIHJldHVybiB7IHNlYywgbnNlYyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlKHRpbWU6IFRpbWUpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWUuc2VjICogMWUzICsgdGltZS5uc2VjIC8gMWU2KTtcbn1cblxuLy8gY29tcGFyZSB0d28gdGltZXMsIHJldHVybmluZyBhIG5lZ2F0aXZlIHZhbHVlIGlmIHRoZSByaWdodCBpcyBncmVhdGVyXG4vLyBvciBhIHBvc2l0aXZlIHZhbHVlIGlmIHRoZSBsZWZ0IGlzIGdyZWF0ZXIgb3IgMCBpZiB0aGUgdGltZXMgYXJlIGVxdWFsXG4vLyB1c2VmdWwgdG8gc3VwcGx5IHRvIEFycmF5LnByb3RvdHlwZS5zb3J0XG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZShsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICBjb25zdCBzZWNEaWZmID0gbGVmdC5zZWMgLSByaWdodC5zZWM7XG4gIHJldHVybiBzZWNEaWZmIHx8IGxlZnQubnNlYyAtIHJpZ2h0Lm5zZWM7XG59XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgbGVmdCB0aW1lIGlzIGxlc3MgdGhhbiB0aGUgcmlnaHQgdGltZSwgb3RoZXJ3aXNlIGZhbHNlXG5leHBvcnQgZnVuY3Rpb24gaXNMZXNzVGhhbihsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICByZXR1cm4gdGhpcy5jb21wYXJlKGxlZnQsIHJpZ2h0KSA8IDA7XG59XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgbGVmdCB0aW1lIGlzIGdyZWF0ZXIgdGhhbiB0aGUgcmlnaHQgdGltZSwgb3RoZXJ3aXNlIGZhbHNlXG5leHBvcnQgZnVuY3Rpb24gaXNHcmVhdGVyVGhhbihsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICByZXR1cm4gdGhpcy5jb21wYXJlKGxlZnQsIHJpZ2h0KSA+IDA7XG59XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiBib3RoIHRpbWVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHNlY29uZHMgYW5kIG5hbm9zZWNvbmRzXG5leHBvcnQgZnVuY3Rpb24gYXJlU2FtZShsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICByZXR1cm4gbGVmdC5zZWMgPT09IHJpZ2h0LnNlYyAmJiBsZWZ0Lm5zZWMgPT09IHJpZ2h0Lm5zZWM7XG59XG5cbmZ1bmN0aW9uIHRvU3RyaW5nKHRpbWU6IFRpbWUpIHtcbiAgcmV0dXJuIGB7JHt0aW1lLnNlY30sICR7dGltZS5uc2VjfX1gO1xufVxuXG4vLyBjb21wdXRlcyB0aGUgc3VtIG9mIHR3byB0aW1lcyBvciBkdXJhdGlvbnMgYW5kIHJldHVybnMgYSBuZXcgdGltZVxuLy8gdGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcmVzdWx0aW5nIHRpbWUgaXMgbmVnYXRpdmVcbmV4cG9ydCBmdW5jdGlvbiBhZGQobGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb25OYW5vcyA9IGxlZnQubnNlYyArIHJpZ2h0Lm5zZWM7XG4gIGNvbnN0IHNlY3NGcm9tTmFub3MgPSBNYXRoLmZsb29yKGR1cmF0aW9uTmFub3MgLyAxZTkpO1xuICBjb25zdCBuZXdTZWNzID0gbGVmdC5zZWMgKyByaWdodC5zZWMgKyBzZWNzRnJvbU5hbm9zO1xuICBjb25zdCByZW1haW5pbmdEdXJhdGlvbk5hbm9zID0gZHVyYXRpb25OYW5vcyAlIDFlOTtcbiAgLy8gdXNlIE1hdGguYWJzIGhlcmUgdG8gcHJldmVudCAtMCB3aGVuIHRoZXJlIGlzIGV4YWN0bHkgMSBzZWNvbmQgb2YgbmVnYXRpdmUgbmFub3NlY29uZHMgcGFzc2VkIGluXG4gIGNvbnN0IG5ld05hbm9zID0gTWF0aC5hYnMoXG4gICAgTWF0aC5zaWduKHJlbWFpbmluZ0R1cmF0aW9uTmFub3MpID09PSAtMSA/IDFlOSArIHJlbWFpbmluZ0R1cmF0aW9uTmFub3MgOiByZW1haW5pbmdEdXJhdGlvbk5hbm9zXG4gICk7XG4gIGNvbnN0IHJlc3VsdCA9IHsgc2VjOiBuZXdTZWNzLCBuc2VjOiBuZXdOYW5vcyB9O1xuICBpZiAocmVzdWx0LnNlYyA8IDAgfHwgcmVzdWx0Lm5zZWMgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEludmFsaWQgdGltZTogJHt0b1N0cmluZyhyZXN1bHQpfSBwcm9kdWNlZCBmcm9tIFRpbWVVdGlsLmFkZCgke3RvU3RyaW5nKGxlZnQpfSwgJHt0b1N0cmluZyhyaWdodCl9fSlgXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IEJhZ1JlYWRlciwgeyB0eXBlIERlY29tcHJlc3MgfSBmcm9tIFwiLi9CYWdSZWFkZXJcIjtcbmltcG9ydCB7IE1lc3NhZ2VSZWFkZXIgfSBmcm9tIFwiLi9NZXNzYWdlUmVhZGVyXCI7XG5pbXBvcnQgUmVhZFJlc3VsdCBmcm9tIFwiLi9SZWFkUmVzdWx0XCI7XG5pbXBvcnQgeyBCYWdIZWFkZXIsIENodW5rSW5mbywgQ29ubmVjdGlvbiwgTWVzc2FnZURhdGEgfSBmcm9tIFwiLi9yZWNvcmRcIjtcbmltcG9ydCB0eXBlIHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgKiBhcyBUaW1lVXRpbCBmcm9tIFwiLi9UaW1lVXRpbFwiO1xuXG5leHBvcnQgdHlwZSBSZWFkT3B0aW9ucyA9IHt8XG4gIGRlY29tcHJlc3M/OiBEZWNvbXByZXNzLFxuICBub1BhcnNlPzogYm9vbGVhbixcbiAgdG9waWNzPzogc3RyaW5nW10sXG4gIHN0YXJ0VGltZT86IFRpbWUsXG4gIGVuZFRpbWU/OiBUaW1lLFxufH07XG5cbi8vIHRoZSBoaWdoIGxldmVsIHJvc2JhZyBpbnRlcmZhY2Vcbi8vIGNyZWF0ZSBhIG5ldyBiYWcgYnkgY2FsbGluZzpcbi8vIGBjb25zdCBiYWcgPSBhd2FpdCBCYWcub3BlbignLi9wYXRoLXRvLWZpbGUuYmFnJylgIGluIG5vZGUgb3Jcbi8vIGBjb25zdCBiYWcgPSBhd2FpdCBCYWcub3BlbihmaWxlc1swXSlgIGluIHRoZSBicm93c2VyXG4vL1xuLy8gYWZ0ZXIgdGhhdCB5b3UgY2FuIGNvbnN1bWUgbWVzc2FnZXMgYnkgY2FsbGluZ1xuLy8gYGF3YWl0IGJhZy5yZWFkTWVzc2FnZXMoeyB0b3BpY3M6IFsnL2ZvbyddIH0sXG4vLyAgICAocmVzdWx0KSA9PiBjb25zb2xlLmxvZyhyZXN1bHQudG9waWMsIHJlc3VsdC5tZXNzYWdlKSlgXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWcge1xuICByZWFkZXI6IEJhZ1JlYWRlcjtcbiAgaGVhZGVyOiBCYWdIZWFkZXI7XG4gIGNvbm5lY3Rpb25zOiB7IFtjb25uOiBudW1iZXJdOiBDb25uZWN0aW9uIH07XG4gIGNodW5rSW5mb3M6IENodW5rSW5mb1tdO1xuICBzdGFydFRpbWU6ID9UaW1lO1xuICBlbmRUaW1lOiA/VGltZTtcblxuICAvLyB5b3UgY2FuIG9wdGlvbmFsbHkgY3JlYXRlIGEgYmFnIG1hbnVhbGx5IHBhc3NpbmcgaW4gYSBiYWdSZWFkZXIgaW5zdGFuY2VcbiAgY29uc3RydWN0b3IoYmFnUmVhZGVyOiBCYWdSZWFkZXIpIHtcbiAgICB0aGlzLnJlYWRlciA9IGJhZ1JlYWRlcjtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBzdGF0aWMgb3BlbiA9IChmaWxlOiBGaWxlIHwgc3RyaW5nKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJUaGlzIG1ldGhvZCBzaG91bGQgaGF2ZSBiZWVuIG92ZXJyaWRkZW4gYmFzZWQgb24gdGhlIGVudmlyb25tZW50LiBNYWtlIHN1cmUgeW91IGFyZSBjb3JyZWN0bHkgaW1wb3J0aW5nIHRoZSBub2RlIG9yIHdlYiB2ZXJzaW9uIG9mIEJhZy5cIlxuICAgICk7XG4gIH07XG5cbiAgLy8gaWYgdGhlIGJhZyBpcyBtYW51YWxseSBjcmVhdGVkIHdpdGggdGhlIGNvbnN0cnVjdG9yLCB5b3UgbXVzdCBjYWxsIGBhd2FpdCBvcGVuKClgIG9uIHRoZSBiYWdcbiAgLy8gZ2VuZXJhbGx5IHRoaXMgaXMgY2FsbGVkIGZvciB5b3UgaWYgeW91J3JlIHVzaW5nIGBjb25zdCBiYWcgPSBhd2FpdCBCYWcub3BlbigpYFxuICBhc3luYyBvcGVuKCkge1xuICAgIHRoaXMuaGVhZGVyID0gYXdhaXQgdGhpcy5yZWFkZXIucmVhZEhlYWRlckFzeW5jKCk7XG4gICAgY29uc3QgeyBjb25uZWN0aW9uQ291bnQsIGNodW5rQ291bnQsIGluZGV4UG9zaXRpb24gfSA9IHRoaXMuaGVhZGVyO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZWFkZXIucmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvQXN5bmMoaW5kZXhQb3NpdGlvbiwgY29ubmVjdGlvbkNvdW50LCBjaHVua0NvdW50KTtcblxuICAgIHRoaXMuY29ubmVjdGlvbnMgPSB7fTtcblxuICAgIHJlc3VsdC5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zW2Nvbm5lY3Rpb24uY29ubl0gPSBjb25uZWN0aW9uO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jaHVua0luZm9zID0gcmVzdWx0LmNodW5rSW5mb3M7XG5cbiAgICBpZiAoY2h1bmtDb3VudCA+IDApIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5jaHVua0luZm9zWzBdLnN0YXJ0VGltZTtcbiAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuY2h1bmtJbmZvc1tjaHVua0NvdW50IC0gMV0uZW5kVGltZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyByZWFkTWVzc2FnZXMob3B0czogUmVhZE9wdGlvbnMsIGNhbGxiYWNrOiAobXNnOiBSZWFkUmVzdWx0PGFueT4pID0+IHZvaWQpIHtcbiAgICBjb25zdCBjb25uZWN0aW9ucyA9IHRoaXMuY29ubmVjdGlvbnM7XG5cbiAgICBjb25zdCBzdGFydFRpbWUgPSBvcHRzLnN0YXJ0VGltZSB8fCB7IHNlYzogMCwgbnNlYzogMCB9O1xuICAgIGNvbnN0IGVuZFRpbWUgPSBvcHRzLmVuZFRpbWUgfHwgeyBzZWM6IE51bWJlci5NQVhfVkFMVUUsIG5zZWM6IE51bWJlci5NQVhfVkFMVUUgfTtcbiAgICBjb25zdCB0b3BpY3MgPVxuICAgICAgb3B0cy50b3BpY3MgfHxcbiAgICAgIE9iamVjdC5rZXlzKGNvbm5lY3Rpb25zKS5tYXAoKGlkOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb25zW2lkXS50b3BpYztcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZmlsdGVyZWRDb25uZWN0aW9ucyA9IE9iamVjdC5rZXlzKGNvbm5lY3Rpb25zKVxuICAgICAgLmZpbHRlcigoaWQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gdG9waWNzLmluZGV4T2YoY29ubmVjdGlvbnNbaWRdLnRvcGljKSAhPT0gLTE7XG4gICAgICB9KVxuICAgICAgLm1hcCgoaWQpID0+ICtpZCk7XG5cbiAgICBjb25zdCB7IGRlY29tcHJlc3MgPSB7fSB9ID0gb3B0cztcblxuICAgIC8vIGZpbHRlciBjaHVua3MgdG8gdGhvc2Ugd2hpY2ggZmFsbCB3aXRoaW4gdGhlIHRpbWUgcmFuZ2Ugd2UncmUgYXR0ZW1wdGluZyB0byByZWFkXG4gICAgY29uc3QgY2h1bmtJbmZvcyA9IHRoaXMuY2h1bmtJbmZvcy5maWx0ZXIoKGluZm8pID0+IHtcbiAgICAgIHJldHVybiBUaW1lVXRpbC5jb21wYXJlKGluZm8uc3RhcnRUaW1lLCBlbmRUaW1lKSA8PSAwICYmIFRpbWVVdGlsLmNvbXBhcmUoc3RhcnRUaW1lLCBpbmZvLmVuZFRpbWUpIDw9IDA7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBwYXJzZU1zZyhtc2c6IE1lc3NhZ2VEYXRhLCBjaHVua09mZnNldDogbnVtYmVyKTogUmVhZFJlc3VsdDxhbnk+IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBjb25uZWN0aW9uc1ttc2cuY29ubl07XG4gICAgICBjb25zdCB7IHRvcGljIH0gPSBjb25uZWN0aW9uO1xuICAgICAgY29uc3QgeyBkYXRhLCB0aW1lOiB0aW1lc3RhbXAgfSA9IG1zZztcbiAgICAgIGxldCBtZXNzYWdlID0gbnVsbDtcbiAgICAgIGlmICghb3B0cy5ub1BhcnNlKSB7XG4gICAgICAgIC8vIGxhemlseSBjcmVhdGUgYSByZWFkZXIgZm9yIHRoaXMgY29ubmVjdGlvbiBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgICAgIGNvbm5lY3Rpb24ucmVhZGVyID0gY29ubmVjdGlvbi5yZWFkZXIgfHwgbmV3IE1lc3NhZ2VSZWFkZXIoY29ubmVjdGlvbi5tZXNzYWdlRGVmaW5pdGlvbik7XG4gICAgICAgIG1lc3NhZ2UgPSBjb25uZWN0aW9uLnJlYWRlci5yZWFkTWVzc2FnZShkYXRhKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUmVhZFJlc3VsdCh0b3BpYywgbWVzc2FnZSwgdGltZXN0YW1wLCBkYXRhLCBjaHVua09mZnNldCwgY2h1bmtJbmZvcy5sZW5ndGgpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtJbmZvcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW5mbyA9IGNodW5rSW5mb3NbaV07XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IHRoaXMucmVhZGVyLnJlYWRDaHVua01lc3NhZ2VzQXN5bmMoXG4gICAgICAgIGluZm8sXG4gICAgICAgIGZpbHRlcmVkQ29ubmVjdGlvbnMsXG4gICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgZW5kVGltZSxcbiAgICAgICAgZGVjb21wcmVzc1xuICAgICAgKTtcbiAgICAgIG1lc3NhZ2VzLmZvckVhY2goKG1zZykgPT4gY2FsbGJhY2socGFyc2VNc2cobXNnLCBpKSkpO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgeyBUaW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLy8gcmVhZHMgdGhyb3VnaCBhIGJ1ZmZlciBhbmQgZXh0cmFjdHMgeyBba2V5OiBzdHJpbmddOiB2YWx1ZTogc3RyaW5nIH1cbi8vIHBhaXJzIC0gdGhlIGJ1ZmZlciBpcyBleHBlY3RlZCB0byBoYXZlIGxlbmd0aCBwcmVmaXhlZCB1dGY4IHN0cmluZ3Ncbi8vIHdpdGggYSAnPScgc2VwYXJhdGluZyB0aGUga2V5IGFuZCB2YWx1ZVxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RGaWVsZHMoYnVmZmVyOiBCdWZmZXIpIHtcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPCA0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGZpZWxkcyBhcmUgdHJ1bmNhdGVkLlwiKTtcbiAgfVxuXG4gIGxldCBpID0gMDtcbiAgY29uc3QgZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9ID0ge307XG5cbiAgd2hpbGUgKGkgPCBidWZmZXIubGVuZ3RoKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLnJlYWRJbnQzMkxFKGkpO1xuICAgIGkgKz0gNDtcblxuICAgIGlmIChpICsgbGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGZpZWxkcyBhcmUgY29ycnVwdC5cIik7XG4gICAgfVxuXG4gICAgY29uc3QgZmllbGQgPSBidWZmZXIuc2xpY2UoaSwgaSArIGxlbmd0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWVsZC5pbmRleE9mKFwiPVwiKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXIgZmllbGQgaXMgbWlzc2luZyBlcXVhbHMgc2lnbi5cIik7XG4gICAgfVxuXG4gICAgZmllbGRzW2ZpZWxkLnNsaWNlKDAsIGluZGV4KS50b1N0cmluZygpXSA9IGZpZWxkLnNsaWNlKGluZGV4ICsgMSk7XG4gICAgaSArPSBsZW5ndGg7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vLyByZWFkcyBhIFRpbWUgb2JqZWN0IG91dCBvZiBhIGJ1ZmZlciBhdCB0aGUgZ2l2ZW4gb2Zmc2V0XG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFRpbWUoYnVmZmVyOiBCdWZmZXIsIG9mZnNldDogbnVtYmVyKTogVGltZSB7XG4gIGNvbnN0IHNlYyA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0KTtcbiAgY29uc3QgbnNlYyA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0ICsgNCk7XG4gIHJldHVybiB7IHNlYywgbnNlYyB9O1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHsgZXh0cmFjdEZpZWxkcyB9IGZyb20gXCIuL2ZpZWxkc1wiO1xuaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSBcIi4vcmVjb3JkXCI7XG5cbi8vIGdpdmVuIGEgYnVmZmVyIHBhcnNlcyBvdXQgdGhlIHJlY29yZCB3aXRoaW4gdGhlIGJ1ZmZlclxuLy8gYmFzZWQgb24gdGhlIG9wY29kZSB0eXBlIGJpdFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSGVhZGVyPFQ6IFJlY29yZD4oYnVmZmVyOiBCdWZmZXIsIGNsczogQ2xhc3M8VD4gJiB7IG9wY29kZTogbnVtYmVyIH0pOiBUIHtcbiAgY29uc3QgZmllbGRzID0gZXh0cmFjdEZpZWxkcyhidWZmZXIpO1xuICBpZiAoZmllbGRzLm9wID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXIgaXMgbWlzc2luZyAnb3AnIGZpZWxkLlwiKTtcbiAgfVxuICBjb25zdCBvcGNvZGUgPSBmaWVsZHMub3AucmVhZFVJbnQ4KDApO1xuICBpZiAob3Bjb2RlICE9PSBjbHMub3Bjb2RlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAke2Nscy5uYW1lfSAoJHtjbHMub3Bjb2RlfSkgYnV0IGZvdW5kICR7b3Bjb2RlfWApO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBjbHMoZmllbGRzKTtcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCAqIGFzIFRpbWVVdGlsIGZyb20gXCIuL1RpbWVVdGlsXCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL2JhZ1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vQmFnUmVhZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9NZXNzYWdlUmVhZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9wYXJzZU1lc3NhZ2VEZWZpbml0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90eXBlc1wiO1xuZXhwb3J0IHsgVGltZVV0aWwgfTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCBIZWFwIGZyb20gXCJoZWFwXCI7XG5cbmZ1bmN0aW9uIG5tZXJnZTxUPihrZXk6IChhOiBULCBiOiBUKSA9PiBudW1iZXIsIC4uLml0ZXJhYmxlczogQXJyYXk8SXRlcmF0b3I8VD4+KSB7XG4gIGNvbnN0IGhlYXA6IEhlYXA8eyBpOiBudW1iZXIsIHZhbHVlOiBUIH0+ID0gbmV3IEhlYXAoKGEsIGIpID0+IHtcbiAgICByZXR1cm4ga2V5KGEudmFsdWUsIGIudmFsdWUpO1xuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB7IHZhbHVlLCBkb25lIH0gPSBpdGVyYWJsZXNbaV0ubmV4dCgpO1xuICAgIGlmICghZG9uZSkge1xuICAgICAgaGVhcC5wdXNoKHsgaSwgdmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuZXh0OiAoKSA9PiB7XG4gICAgICBpZiAoaGVhcC5lbXB0eSgpKSB7XG4gICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgaSB9ID0gaGVhcC5mcm9udCgpO1xuICAgICAgY29uc3QgbmV4dCA9IGl0ZXJhYmxlc1tpXS5uZXh0KCk7XG4gICAgICBpZiAobmV4dC5kb25lKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBoZWFwLnBvcCgpLnZhbHVlLCBkb25lOiBmYWxzZSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgdmFsdWU6IGhlYXAucmVwbGFjZSh7IGksIHZhbHVlOiBuZXh0LnZhbHVlIH0pLnZhbHVlLCBkb25lOiBmYWxzZSB9O1xuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5tZXJnZTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gXCJidWZmZXJcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgTWVzc2FnZVJlYWRlciwgcGFyc2VNZXNzYWdlRGVmaW5pdGlvbiwgcm9zUHJpbWl0aXZlVHlwZXMsIFRpbWVVdGlsIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgdHlwZSB7IENhbGxiYWNrIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgQmFnIGZyb20gXCIuLi9iYWdcIjtcbmltcG9ydCBCYWdSZWFkZXIgZnJvbSBcIi4uL0JhZ1JlYWRlclwiO1xuXG4vLyByZWFkZXIgdXNpbmcgbm9kZWpzIGZzIGFwaVxuZXhwb3J0IGNsYXNzIFJlYWRlciB7XG4gIF9maWxlbmFtZTogc3RyaW5nO1xuICBfZmQ6ID9udW1iZXI7XG4gIF9zaXplOiBudW1iZXI7XG4gIF9idWZmZXI6IEJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgICB0aGlzLl9mZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9zaXplID0gMDtcbiAgICB0aGlzLl9idWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUoMCk7XG4gIH1cblxuICAvLyBvcGVuIGEgZmlsZSBmb3IgcmVhZGluZ1xuICBfb3BlbihjYjogKGVycm9yOiA/RXJyb3IpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBmcy5zdGF0KHRoaXMuX2ZpbGVuYW1lLCAoZXJyb3IsIHN0YXQpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gY2IoZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZnMub3Blbih0aGlzLl9maWxlbmFtZSwgXCJyXCIsIChlcnIsIGZkKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ZkID0gZmQ7XG4gICAgICAgIHRoaXMuX3NpemUgPSBzdGF0LnNpemU7XG4gICAgICAgIHJldHVybiBjYihudWxsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2xvc2UoY2I6IChlcnJvcjogP0Vycm9yKSA9PiB2b2lkKSB7XG4gICAgaWYgKHRoaXMuX2ZkICE9IG51bGwpIHtcbiAgICAgIGZzLmNsb3NlKHRoaXMuX2ZkLCBjYik7XG4gICAgfVxuICB9XG5cbiAgLy8gcmVhZCBsZW5ndGggKGJ5dGVzKSBzdGFydGluZyBmcm9tIG9mZnNldCAoYnl0ZXMpXG4gIC8vIGNhbGxiYWNrKGVyciwgYnVmZmVyKVxuICByZWFkKG9mZnNldDogbnVtYmVyLCBsZW5ndGg6IG51bWJlciwgY2I6IENhbGxiYWNrPEJ1ZmZlcj4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZmQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX29wZW4oKGVycikgPT4ge1xuICAgICAgICByZXR1cm4gZXJyID8gY2IoZXJyKSA6IHRoaXMucmVhZChvZmZzZXQsIGxlbmd0aCwgY2IpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiB0aGlzLl9idWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgdGhpcy5fYnVmZmVyID0gQnVmZmVyLmFsbG9jKGxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiBmcy5yZWFkKHRoaXMuX2ZkLCB0aGlzLl9idWZmZXIsIDAsIGxlbmd0aCwgb2Zmc2V0LCAoZXJyLCBieXRlcywgYnVmZikgPT4ge1xuICAgICAgcmV0dXJuIGVyciA/IGNiKGVycikgOiBjYihudWxsLCBidWZmKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJldHVybiB0aGUgc2l6ZSBvZiB0aGUgZmlsZVxuICBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG59XG5cbmNvbnN0IG9wZW4gPSBhc3luYyAoZmlsZW5hbWU6IEZpbGUgfCBzdHJpbmcpID0+IHtcbiAgaWYgKHR5cGVvZiBmaWxlbmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiRXhwZWN0ZWQgZmlsZW5hbWUgdG8gYmUgYSBzdHJpbmcuIE1ha2Ugc3VyZSB5b3UgYXJlIGNvcnJlY3RseSBpbXBvcnRpbmcgdGhlIG5vZGUgb3Igd2ViIHZlcnNpb24gb2YgQmFnLlwiXG4gICAgKTtcbiAgfVxuICBjb25zdCBiYWcgPSBuZXcgQmFnKG5ldyBCYWdSZWFkZXIobmV3IFJlYWRlcihmaWxlbmFtZSkpKTtcbiAgYXdhaXQgYmFnLm9wZW4oKTtcbiAgcmV0dXJuIGJhZztcbn07XG5CYWcub3BlbiA9IG9wZW47XG5cbmV4cG9ydCAqIGZyb20gXCIuLi90eXBlc1wiO1xuZXhwb3J0IHsgVGltZVV0aWwsIEJhZ1JlYWRlciwgTWVzc2FnZVJlYWRlciwgb3BlbiwgcGFyc2VNZXNzYWdlRGVmaW5pdGlvbiwgcm9zUHJpbWl0aXZlVHlwZXMgfTtcbmV4cG9ydCBkZWZhdWx0IEJhZztcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbi8vIFNldCBvZiBidWlsdC1pbiByb3MgdHlwZXMuIFNlZSBodHRwOi8vd2lraS5yb3Mub3JnL21zZyNGaWVsZF9UeXBlc1xuZXhwb3J0IGNvbnN0IHJvc1ByaW1pdGl2ZVR5cGVzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoW1xuICBcInN0cmluZ1wiLFxuICBcImJvb2xcIixcbiAgXCJpbnQ4XCIsXG4gIFwidWludDhcIixcbiAgXCJpbnQxNlwiLFxuICBcInVpbnQxNlwiLFxuICBcImludDMyXCIsXG4gIFwidWludDMyXCIsXG4gIFwiZmxvYXQzMlwiLFxuICBcImZsb2F0NjRcIixcbiAgXCJpbnQ2NFwiLFxuICBcInVpbnQ2NFwiLFxuICBcInRpbWVcIixcbiAgXCJkdXJhdGlvblwiLFxuXSk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVR5cGUodHlwZTogc3RyaW5nKSB7XG4gIC8vIE5vcm1hbGl6ZSBkZXByZWNhdGVkIGFsaWFzZXMuXG4gIGxldCBub3JtYWxpemVkVHlwZSA9IHR5cGU7XG4gIGlmICh0eXBlID09PSBcImNoYXJcIikge1xuICAgIG5vcm1hbGl6ZWRUeXBlID0gXCJ1aW50OFwiO1xuICB9XG4gIGlmICh0eXBlID09PSBcImJ5dGVcIikge1xuICAgIG5vcm1hbGl6ZWRUeXBlID0gXCJpbnQ4XCI7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZWRUeXBlO1xufVxuXG4vLyByZXByZXNlbnRzIGEgc2luZ2xlIGxpbmUgaW4gYSBtZXNzYWdlIGRlZmluaXRpb24gdHlwZVxuLy8gZS5nLiAnc3RyaW5nIG5hbWUnICdDdXN0b21UeXBlW10gZm9vJyAnc3RyaW5nWzNdIG5hbWVzJ1xuZnVuY3Rpb24gbmV3QXJyYXlEZWZpbml0aW9uKHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nLCBhcnJheUxlbmd0aDogP251bWJlcik6IFJvc01zZ0ZpZWxkIHtcbiAgY29uc3Qgbm9ybWFsaXplZFR5cGUgPSBub3JtYWxpemVUeXBlKHR5cGUpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IG5vcm1hbGl6ZWRUeXBlLFxuICAgIG5hbWUsXG4gICAgaXNBcnJheTogdHJ1ZSxcbiAgICBhcnJheUxlbmd0aDogYXJyYXlMZW5ndGggPT09IG51bGwgPyB1bmRlZmluZWQgOiBhcnJheUxlbmd0aCxcbiAgICBpc0NvbXBsZXg6ICFyb3NQcmltaXRpdmVUeXBlcy5oYXMobm9ybWFsaXplZFR5cGUpLFxuICB9O1xufVxuZnVuY3Rpb24gbmV3RGVmaW5pdGlvbih0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFJvc01zZ0ZpZWxkIHtcbiAgY29uc3Qgbm9ybWFsaXplZFR5cGUgPSBub3JtYWxpemVUeXBlKHR5cGUpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IG5vcm1hbGl6ZWRUeXBlLFxuICAgIG5hbWUsXG4gICAgaXNBcnJheTogZmFsc2UsXG4gICAgaXNDb21wbGV4OiAhcm9zUHJpbWl0aXZlVHlwZXMuaGFzKG5vcm1hbGl6ZWRUeXBlKSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgUm9zTXNnRmllbGQgPVxuICB8IHt8XG4gICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICBpc0NvbnN0YW50PzogYm9vbGVhbixcbiAgICAgIGlzQ29tcGxleD86IGJvb2xlYW4sXG4gICAgICB2YWx1ZT86IG1peGVkLFxuICAgICAgaXNBcnJheT86IGZhbHNlLFxuICAgICAgYXJyYXlMZW5ndGg/OiB2b2lkLFxuICAgIHx9XG4gIHwge3xcbiAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgIGlzQ29uc3RhbnQ/OiBib29sZWFuLFxuICAgICAgaXNDb21wbGV4PzogYm9vbGVhbixcbiAgICAgIHZhbHVlPzogbWl4ZWQsXG4gICAgICBpc0FycmF5OiB0cnVlLFxuICAgICAgYXJyYXlMZW5ndGg6ID9udW1iZXIsXG4gICAgfH07XG5cbmV4cG9ydCB0eXBlIFJvc01zZ0RlZmluaXRpb24gPSB7fFxuICBuYW1lPzogc3RyaW5nLFxuICBkZWZpbml0aW9uczogUm9zTXNnRmllbGRbXSxcbnx9O1xuZXhwb3J0IHR5cGUgTmFtZWRSb3NNc2dEZWZpbml0aW9uID0ge3xcbiAgbmFtZTogc3RyaW5nLFxuICBkZWZpbml0aW9uczogUm9zTXNnRmllbGRbXSxcbnx9O1xuXG5jb25zdCBidWlsZFR5cGUgPSAobGluZXM6IHN0cmluZ1tdKTogUm9zTXNnRGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IGRlZmluaXRpb25zOiBSb3NNc2dGaWVsZFtdID0gW107XG4gIGxldCBjb21wbGV4VHlwZU5hbWU6ID9zdHJpbmc7XG4gIGxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAvLyByZW1vdmUgY29tbWVudHMgYW5kIGV4dHJhIHdoaXRlc3BhY2UgZnJvbSBlYWNoIGxpbmVcbiAgICBjb25zdCBzcGxpdHMgPSBsaW5lXG4gICAgICAucmVwbGFjZSgvIy4qL2dpLCBcIlwiKVxuICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgLmZpbHRlcigod29yZCkgPT4gd29yZCk7XG4gICAgaWYgKCFzcGxpdHNbMV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY29uc3VtZSBjb21tZW50c1xuICAgIGNvbnN0IHR5cGUgPSBzcGxpdHNbMF0udHJpbSgpO1xuICAgIGNvbnN0IG5hbWUgPSBzcGxpdHNbMV0udHJpbSgpO1xuICAgIGlmICh0eXBlID09PSBcIk1TRzpcIikge1xuICAgICAgY29tcGxleFR5cGVOYW1lID0gbmFtZTtcbiAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihcIj1cIikgPiAtMSB8fCBzcGxpdHMuaW5kZXhPZihcIj1cIikgPiAtMSkge1xuICAgICAgLy8gY29uc3RhbnQgdHlwZSBwYXJzaW5nXG4gICAgICBjb25zdCBtYXRjaGVzID0gbGluZS5tYXRjaCgvKFxcUyspXFxzKj1cXHMqKC4qKVxccyovKTtcbiAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYWxmb3JtZWQgbGluZTogXCIgKyBsaW5lKTtcbiAgICAgIH1cbiAgICAgIGxldCB2YWx1ZTogYW55ID0gbWF0Y2hlc1syXTtcbiAgICAgIGlmICh0eXBlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoL1xccyojLiovZywgXCJcIikpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvciBpbiB0aGlzIGNvbnN0YW50IGRlZmluaXRpb246ICR7bGluZX1gKTtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gXCJib29sXCIpIHtcbiAgICAgICAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoKHR5cGUuaW5jbHVkZXMoXCJpbnRcIikgJiYgdmFsdWUgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikgfHwgdmFsdWUgPCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUikge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLndhcm4oYEZvdW5kIGludGVnZXIgY29uc3RhbnQgb3V0c2lkZSBzYWZlIGludGVnZXIgcmFuZ2U6ICR7bGluZX1gKTtcbiAgICAgIH1cbiAgICAgIGRlZmluaXRpb25zLnB1c2goe1xuICAgICAgICB0eXBlOiBub3JtYWxpemVUeXBlKHR5cGUpLFxuICAgICAgICBuYW1lOiBtYXRjaGVzWzFdLFxuICAgICAgICBpc0NvbnN0YW50OiB0cnVlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZS5pbmRleE9mKFwiXVwiKSA9PT0gdHlwZS5sZW5ndGggLSAxKSB7XG4gICAgICAvLyBhcnJheSB0eXBlIHBhcnNpbmdcbiAgICAgIGNvbnN0IHR5cGVTcGxpdHMgPSB0eXBlLnNwbGl0KFwiW1wiKTtcbiAgICAgIGNvbnN0IGJhc2VUeXBlID0gdHlwZVNwbGl0c1swXTtcbiAgICAgIGNvbnN0IGxlbiA9IHR5cGVTcGxpdHNbMV0ucmVwbGFjZShcIl1cIiwgXCJcIik7XG4gICAgICBkZWZpbml0aW9ucy5wdXNoKG5ld0FycmF5RGVmaW5pdGlvbihiYXNlVHlwZSwgbmFtZSwgbGVuID8gcGFyc2VJbnQobGVuLCAxMCkgOiB1bmRlZmluZWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5pdGlvbnMucHVzaChuZXdEZWZpbml0aW9uKHR5cGUsIG5hbWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4geyBuYW1lOiBjb21wbGV4VHlwZU5hbWUsIGRlZmluaXRpb25zIH07XG59O1xuXG5jb25zdCBmaW5kVHlwZUJ5TmFtZSA9ICh0eXBlczogUm9zTXNnRGVmaW5pdGlvbltdLCBuYW1lOiBzdHJpbmcpOiBSb3NNc2dEZWZpbml0aW9uID0+IHtcbiAgY29uc3QgbWF0Y2hlcyA9IHR5cGVzLmZpbHRlcigodHlwZSkgPT4ge1xuICAgIGNvbnN0IHR5cGVOYW1lID0gdHlwZS5uYW1lIHx8IFwiXCI7XG4gICAgLy8gaWYgdGhlIHNlYXJjaCBpcyBlbXB0eSwgcmV0dXJuIHVubmFtZWQgdHlwZXNcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiAhdHlwZU5hbWU7XG4gICAgfVxuICAgIC8vIHJldHVybiBpZiB0aGUgc2VhcmNoIGlzIGluIHRoZSB0eXBlIG5hbWVcbiAgICAvLyBvciBtYXRjaGVzIGV4YWN0bHkgaWYgYSBmdWxseS1xdWFsaWZpZWQgbmFtZSBtYXRjaCBpcyBwYXNzZWQgdG8gdXNcbiAgICBjb25zdCBuYW1lRW5kID0gbmFtZS5pbmRleE9mKFwiL1wiKSA+IC0xID8gbmFtZSA6IGAvJHtuYW1lfWA7XG4gICAgcmV0dXJuIHR5cGVOYW1lLmVuZHNXaXRoKG5hbWVFbmQpO1xuICB9KTtcbiAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAxIHRvcCBsZXZlbCB0eXBlIGRlZmluaXRpb24gZm9yICcke25hbWV9JyBidXQgZm91bmQgJHttYXRjaGVzLmxlbmd0aH1gKTtcbiAgfVxuICByZXR1cm4gbWF0Y2hlc1swXTtcbn07XG5cbi8vIEdpdmVuIGEgcmF3IG1lc3NhZ2UgZGVmaW5pdGlvbiBzdHJpbmcsIHBhcnNlIGl0IGludG8gYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uLlxuLy8gRXhhbXBsZSByZXR1cm4gdmFsdWU6XG4vLyBbe1xuLy8gICBuYW1lOiB1bmRlZmluZWQsXG4vLyAgIGRlZmluaXRpb25zOiBbXG4vLyAgICAge1xuLy8gICAgICAgYXJyYXlMZW5ndGg6IHVuZGVmaW5lZCxcbi8vICAgICAgIGlzQXJyYXk6IGZhbHNlLFxuLy8gICAgICAgaXNDb21wbGV4OiBmYWxzZSxcbi8vICAgICAgIG5hbWU6IFwibmFtZVwiLFxuLy8gICAgICAgdHlwZTogXCJzdHJpbmdcIixcbi8vICAgICB9LCAuLi5cbi8vICAgXSxcbi8vIH0sIC4uLiBdXG4vL1xuLy8gU2VlIHVuaXQgdGVzdHMgZm9yIG1vcmUgZXhhbXBsZXMuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNZXNzYWdlRGVmaW5pdGlvbihtZXNzYWdlRGVmaW5pdGlvbjogc3RyaW5nKSB7XG4gIC8vIHJlYWQgYWxsIHRoZSBsaW5lcyBhbmQgcmVtb3ZlIGVtcHRpZXNcbiAgY29uc3QgYWxsTGluZXMgPSBtZXNzYWdlRGVmaW5pdGlvblxuICAgIC5zcGxpdChcIlxcblwiKVxuICAgIC5tYXAoKGxpbmUpID0+IGxpbmUudHJpbSgpKVxuICAgIC5maWx0ZXIoKGxpbmUpID0+IGxpbmUpO1xuXG4gIGxldCBkZWZpbml0aW9uTGluZXM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10gPSBbXTtcbiAgLy8gZ3JvdXAgbGluZXMgaW50byBpbmRpdmlkdWFsIGRlZmluaXRpb25zXG4gIGFsbExpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAvLyBza2lwIGNvbW1lbnQgbGluZXNcbiAgICBpZiAobGluZS5pbmRleE9mKFwiI1wiKSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBkZWZpbml0aW9ucyBhcmUgc3BsaXQgYnkgZXF1YWwgc2lnbnNcbiAgICBpZiAobGluZS5pbmRleE9mKFwiPT1cIikgPT09IDApIHtcbiAgICAgIHR5cGVzLnB1c2goYnVpbGRUeXBlKGRlZmluaXRpb25MaW5lcykpO1xuICAgICAgZGVmaW5pdGlvbkxpbmVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZmluaXRpb25MaW5lcy5wdXNoKGxpbmUpO1xuICAgIH1cbiAgfSk7XG4gIHR5cGVzLnB1c2goYnVpbGRUeXBlKGRlZmluaXRpb25MaW5lcykpO1xuXG4gIC8vIEZpeCB1cCBjb21wbGV4IHR5cGUgbmFtZXNcbiAgdHlwZXMuZm9yRWFjaCgoeyBkZWZpbml0aW9ucyB9KSA9PiB7XG4gICAgZGVmaW5pdGlvbnMuZm9yRWFjaCgoZGVmaW5pdGlvbikgPT4ge1xuICAgICAgaWYgKGRlZmluaXRpb24uaXNDb21wbGV4KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kTmFtZSA9IGZpbmRUeXBlQnlOYW1lKHR5cGVzLCBkZWZpbml0aW9uLnR5cGUpLm5hbWU7XG4gICAgICAgIGlmIChmb3VuZE5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyB0eXBlIGRlZmluaXRpb24gZm9yICR7ZGVmaW5pdGlvbi50eXBlfWApO1xuICAgICAgICB9XG4gICAgICAgIGRlZmluaXRpb24udHlwZSA9IGZvdW5kTmFtZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHR5cGVzO1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IGludDUzIGZyb20gXCJpbnQ1M1wiO1xuXG5pbXBvcnQgeyBleHRyYWN0RmllbGRzLCBleHRyYWN0VGltZSB9IGZyb20gXCIuL2ZpZWxkc1wiO1xuaW1wb3J0IHsgTWVzc2FnZVJlYWRlciB9IGZyb20gXCIuL01lc3NhZ2VSZWFkZXJcIjtcbmltcG9ydCB0eXBlIHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IHJlYWRVSW50NjRMRSA9IChidWZmZXI6IEJ1ZmZlcikgPT4ge1xuICByZXR1cm4gaW50NTMucmVhZFVJbnQ2NExFKGJ1ZmZlciwgMCk7XG59O1xuXG5leHBvcnQgY2xhc3MgUmVjb3JkIHtcbiAgb2Zmc2V0OiBudW1iZXI7XG4gIGRhdGFPZmZzZXQ6IG51bWJlcjtcbiAgZW5kOiBudW1iZXI7XG4gIGxlbmd0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKF9maWVsZHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHt9XG5cbiAgcGFyc2VEYXRhKF9idWZmZXI6IEJ1ZmZlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEJhZ0hlYWRlciBleHRlbmRzIFJlY29yZCB7XG4gIHN0YXRpYyBvcGNvZGUgPSAzO1xuICBpbmRleFBvc2l0aW9uOiBudW1iZXI7XG4gIGNvbm5lY3Rpb25Db3VudDogbnVtYmVyO1xuICBjaHVua0NvdW50OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLmluZGV4UG9zaXRpb24gPSByZWFkVUludDY0TEUoZmllbGRzLmluZGV4X3Bvcyk7XG4gICAgdGhpcy5jb25uZWN0aW9uQ291bnQgPSBmaWVsZHMuY29ubl9jb3VudC5yZWFkSW50MzJMRSgwKTtcbiAgICB0aGlzLmNodW5rQ291bnQgPSBmaWVsZHMuY2h1bmtfY291bnQucmVhZEludDMyTEUoMCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENodW5rIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDU7XG4gIGNvbXByZXNzaW9uOiBzdHJpbmc7XG4gIHNpemU6IG51bWJlcjtcbiAgZGF0YTogQnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSkge1xuICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgdGhpcy5jb21wcmVzc2lvbiA9IGZpZWxkcy5jb21wcmVzc2lvbi50b1N0cmluZygpO1xuICAgIHRoaXMuc2l6ZSA9IGZpZWxkcy5zaXplLnJlYWRVSW50MzJMRSgwKTtcbiAgfVxuXG4gIHBhcnNlRGF0YShidWZmZXI6IEJ1ZmZlcikge1xuICAgIHRoaXMuZGF0YSA9IGJ1ZmZlcjtcbiAgfVxufVxuXG5jb25zdCBnZXRGaWVsZCA9IChmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0sIGtleTogc3RyaW5nKSA9PiB7XG4gIGlmIChmaWVsZHNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb25uZWN0aW9uIGhlYWRlciBpcyBtaXNzaW5nICR7a2V5fS5gKTtcbiAgfVxuICByZXR1cm4gZmllbGRzW2tleV0udG9TdHJpbmcoKTtcbn07XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDc7XG4gIGNvbm46IG51bWJlcjtcbiAgdG9waWM6IHN0cmluZztcbiAgdHlwZTogP3N0cmluZztcbiAgbWQ1c3VtOiA/c3RyaW5nO1xuICBtZXNzYWdlRGVmaW5pdGlvbjogc3RyaW5nO1xuICBjYWxsZXJpZDogP3N0cmluZztcbiAgbGF0Y2hpbmc6ID9ib29sZWFuO1xuICByZWFkZXI6ID9NZXNzYWdlUmVhZGVyO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSkge1xuICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgdGhpcy5jb25uID0gZmllbGRzLmNvbm4ucmVhZFVJbnQzMkxFKDApO1xuICAgIHRoaXMudG9waWMgPSBmaWVsZHMudG9waWMudG9TdHJpbmcoKTtcbiAgICB0aGlzLnR5cGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5tZDVzdW0gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5tZXNzYWdlRGVmaW5pdGlvbiA9IFwiXCI7XG4gIH1cblxuICBwYXJzZURhdGEoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICBjb25zdCBmaWVsZHMgPSBleHRyYWN0RmllbGRzKGJ1ZmZlcik7XG4gICAgdGhpcy50eXBlID0gZ2V0RmllbGQoZmllbGRzLCBcInR5cGVcIik7XG4gICAgdGhpcy5tZDVzdW0gPSBnZXRGaWVsZChmaWVsZHMsIFwibWQ1c3VtXCIpO1xuICAgIHRoaXMubWVzc2FnZURlZmluaXRpb24gPSBnZXRGaWVsZChmaWVsZHMsIFwibWVzc2FnZV9kZWZpbml0aW9uXCIpO1xuICAgIGlmIChmaWVsZHMuY2FsbGVyaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jYWxsZXJpZCA9IGZpZWxkcy5jYWxsZXJpZC50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZmllbGRzLmxhdGNoaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubGF0Y2hpbmcgPSBmaWVsZHMubGF0Y2hpbmcudG9TdHJpbmcoKSA9PT0gXCIxXCI7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlRGF0YSBleHRlbmRzIFJlY29yZCB7XG4gIHN0YXRpYyBvcGNvZGUgPSAyO1xuICBjb25uOiBudW1iZXI7XG4gIHRpbWU6IFRpbWU7XG4gIGRhdGE6IEJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0pIHtcbiAgICBzdXBlcihmaWVsZHMpO1xuICAgIHRoaXMuY29ubiA9IGZpZWxkcy5jb25uLnJlYWRVSW50MzJMRSgwKTtcbiAgICB0aGlzLnRpbWUgPSBleHRyYWN0VGltZShmaWVsZHMudGltZSwgMCk7XG4gIH1cblxuICBwYXJzZURhdGEoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICB0aGlzLmRhdGEgPSBidWZmZXI7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEluZGV4RGF0YSBleHRlbmRzIFJlY29yZCB7XG4gIHN0YXRpYyBvcGNvZGUgPSA0O1xuICB2ZXI6IG51bWJlcjtcbiAgY29ubjogbnVtYmVyO1xuICBjb3VudDogbnVtYmVyO1xuICBpbmRpY2VzOiBBcnJheTx7IHRpbWU6IFRpbWUsIG9mZnNldDogbnVtYmVyIH0+O1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSkge1xuICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgdGhpcy52ZXIgPSBmaWVsZHMudmVyLnJlYWRVSW50MzJMRSgwKTtcbiAgICB0aGlzLmNvbm4gPSBmaWVsZHMuY29ubi5yZWFkVUludDMyTEUoMCk7XG4gICAgdGhpcy5jb3VudCA9IGZpZWxkcy5jb3VudC5yZWFkVUludDMyTEUoMCk7XG4gIH1cblxuICBwYXJzZURhdGEoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICB0aGlzLmluZGljZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY291bnQ7IGkrKykge1xuICAgICAgdGhpcy5pbmRpY2VzLnB1c2goe1xuICAgICAgICB0aW1lOiBleHRyYWN0VGltZShidWZmZXIsIGkgKiAxMiksXG4gICAgICAgIG9mZnNldDogYnVmZmVyLnJlYWRVSW50MzJMRShpICogMTIgKyA4KSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2h1bmtJbmZvIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDY7XG4gIHZlcjogbnVtYmVyO1xuICBjaHVua1Bvc2l0aW9uOiBudW1iZXI7XG4gIHN0YXJ0VGltZTogVGltZTtcbiAgZW5kVGltZTogVGltZTtcbiAgY291bnQ6IG51bWJlcjtcbiAgY29ubmVjdGlvbnM6IEFycmF5PHsgY29ubjogbnVtYmVyLCBjb3VudDogbnVtYmVyIH0+O1xuICBuZXh0Q2h1bms6ID9DaHVua0luZm87XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLnZlciA9IGZpZWxkcy52ZXIucmVhZFVJbnQzMkxFKDApO1xuICAgIHRoaXMuY2h1bmtQb3NpdGlvbiA9IHJlYWRVSW50NjRMRShmaWVsZHMuY2h1bmtfcG9zKTtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IGV4dHJhY3RUaW1lKGZpZWxkcy5zdGFydF90aW1lLCAwKTtcbiAgICB0aGlzLmVuZFRpbWUgPSBleHRyYWN0VGltZShmaWVsZHMuZW5kX3RpbWUsIDApO1xuICAgIHRoaXMuY291bnQgPSBmaWVsZHMuY291bnQucmVhZFVJbnQzMkxFKDApO1xuICB9XG5cbiAgcGFyc2VEYXRhKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgdGhpcy5jb25uZWN0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLnB1c2goe1xuICAgICAgICBjb25uOiBidWZmZXIucmVhZFVJbnQzMkxFKGkgKiA4KSxcbiAgICAgICAgY291bnQ6IGJ1ZmZlci5yZWFkVUludDMyTEUoaSAqIDggKyA0KSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYnVmZmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlYXBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW50NTNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==