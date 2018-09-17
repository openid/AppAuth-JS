/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {BasicQueryStringUtils} from './query_string_utils';
import {LocationLike} from './types';

const MOCK_LOCATION_UNDEFINED = 'undefined';

/**
 * Useful in the context of writing tests.
 */
class MockLocationLike implements LocationLike {
  public hash: string;
  public host: string;
  public origin: string;
  public hostname: string;
  public pathname: string;
  public port: string;
  public protocol: string;
  public search: string;
  public assign: (url: string) => void;

  constructor() {
    this.hash = MOCK_LOCATION_UNDEFINED;
    this.host = MOCK_LOCATION_UNDEFINED;
    this.origin = MOCK_LOCATION_UNDEFINED;
    this.hostname = MOCK_LOCATION_UNDEFINED;
    this.pathname = MOCK_LOCATION_UNDEFINED;
    this.port = MOCK_LOCATION_UNDEFINED;
    this.protocol = MOCK_LOCATION_UNDEFINED;
    this.search = MOCK_LOCATION_UNDEFINED;
    this.assign = () => {};
  }

  setHash(hash: string): MockLocationLike {
    this.hash = hash;
    return this;
  }

  setHost(host: string): MockLocationLike {
    this.host = host;
    return this;
  }

  setOrigin(origin: string): MockLocationLike {
    this.origin = origin;
    return this;
  }

  setHostname(hostname: string): MockLocationLike {
    this.hostname = hostname;
    return this;
  }

  setPathname(pathname: string): MockLocationLike {
    this.pathname = pathname;
    return this;
  }

  setPort(port: string): MockLocationLike {
    this.port = port;
    return this;
  }

  setProtocol(protocol: string): MockLocationLike {
    this.protocol = protocol;
    return this;
  }

  setSearch(search: string): MockLocationLike {
    this.search = search;
    return this;
  }

  setAssign(assign: () => void) {
    this.assign = assign;
    return this;
  }
}

describe('Query String Parser Tests', () => {
  const locationLike = new MockLocationLike();
  const parser = new BasicQueryStringUtils();

  it('Empty query string should not blow up.', () => {
    locationLike.setSearch('?');
    let result = parser.parse(locationLike);
    let keys = Object.keys(result);
    expect(result).toBeTruthy();
    expect(keys.length).toBe(0, 'No query parameters provided');
  });

  it('Should parse simple query strings.', () => {
    locationLike.setSearch(encodeURI('key1=value1&key2=value 2& key3= value 3'));
    let result = parser.parse(locationLike);
    let keys = Object.keys(result);
    expect(result).toBeTruthy();
    expect(keys.length).toBe(3, '3 Query parameters should be present');
    expect(keys[0]).toBe('key1');
    expect(keys[1]).toBe('key2');
    expect(keys[2]).toBe(' key3');
    expect(result[keys[0]]).toBe('value1', 'Expected value is "value1"');
    expect(result[keys[1]]).toBe('value 2', 'Expected value is "value 2"');
    expect(result[keys[2]]).toBe(' value 3', 'Expected value is " value 3"');
  });

  it('Should handle params with no values', () => {
    locationLike.setSearch(encodeURI('key1=value1&key2='));
    let result = parser.parse(locationLike);
    let keys = Object.keys(result);
    expect(result).toBeTruthy();
    expect(keys.length).toBe(1, '1 Query parameter should be present');
    expect(keys[0]).toBe('key1');
    expect(result[keys[0]]).toBe('value1', 'Expected value is "value1"');
  });

  it('Should handle duplicate parameter values', () => {
    locationLike.setSearch(encodeURI('key1=value1&key1=value2'));
    let result = parser.parse(locationLike);
    let keys = Object.keys(result);
    expect(result).toBeTruthy();
    expect(keys.length).toBe(1, '1 Query parameter should be present');
    expect(keys[0]).toBe('key1');
    expect(result[keys[0]]).toBe('value2', 'Expected value is "value2"');
  });

  it('Should be able to deal with escaped # or ? characters', () => {
    locationLike.setSearch(encodeURI('key1=value1?&key2=value2 #'));
    let result = parser.parse(locationLike);
    let keys = Object.keys(result);
    expect(result).toBeTruthy();
    expect(keys.length).toBe(2, '2 Query parameters should be present');
    expect(keys[0]).toBe('key1');
    expect(keys[1]).toBe('key2');
    expect(result[keys[0]]).toBe('value1?', 'Expected value is "value1?"');
    expect(result[keys[1]]).toBe('value2 #', 'Expected value is "value2 #"');
  });
});
