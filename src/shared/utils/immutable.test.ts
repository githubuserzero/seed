import { List, Map, Record } from 'immutable';
import { TypedMap } from './immutable';

describe('Immutable.js', () => {
  describe('TypedMap', () => {
    interface Type {
      a: number;
      b: number;
      c: number;
    }
    
    it('should working fine TypedMap', () => {
      let tm: TypedMap<Type, number> = TypedMap<Type, number>();
      tm = tm.set('a', 10).set('b', 20).set('c', 30);
      
      expect(tm.get('a')).toEqual(10);
      expect(tm.get('b')).toEqual(20);
      expect(tm.get('c')).toEqual(30);
    });
    
    it('should be casting successful from TypedMap to Map', () => {
      let tm: TypedMap<Type, number> = TypedMap<Type, number>();
      tm = tm.set('a', 10).set('b', 20).set('c', 30);
      
      const m: Map<string, number> = tm as Map<string, number>;
      expect(m.get('a')).toEqual(10);
      expect(m.get('b')).toEqual(20);
      expect(m.get('c')).toEqual(30);
    });
    
    it('should be casting successful from Map to TypedMap', () => {
      const m: Map<string, number> = Map<string, number>([['a', 1], ['b', 2], ['c', 3]]);
      const tm: TypedMap<Type, number> = m as TypedMap<Type, number>;
      
      expect(tm.get('a')).toEqual(1);
      expect(tm.get('b')).toEqual(2);
      expect(tm.get('c')).toEqual(3);
    });
  });
  
  describe('Record', () => {
    interface Type {
      list: List<Map<string, string>>;
    }
    
    function getDefaultValue(): Type {
      return {
        list: List<Map<string, string>>([
          Map<string>({a: 'a1', b: 'b1'}),
          Map<string>({a: 'a2', b: 'b2'}),
          Map<string>({a: 'a3', b: 'b3'}),
          Map<string>({a: 'a4', b: 'b4'}),
        ]),
      };
    }
    
    it('should working fine Record.getIn(), setIn(), updateIn()', () => {
      type TypeRecored = Record.Instance<Type> & Readonly<Type>;
      const x: TypeRecored = Record<Type>(getDefaultValue())();
      expect(x.getIn(['list', 0, 'a'])).toEqual('a1');
      expect(x.getIn(['list', 0, 'b'])).toEqual('b1');
      expect(x.getIn(['list', 1, 'a'])).toEqual('a2');
      expect(x.getIn(['list', 1, 'b'])).toEqual('b2');
      expect(x.getIn(['list', 2, 'a'])).toEqual('a3');
      expect(x.getIn(['list', 2, 'b'])).toEqual('b3');
      expect(x.getIn(['list', 3, 'a'])).toEqual('a4');
      expect(x.getIn(['list', 3, 'b'])).toEqual('b4');
      
      const y: TypeRecored = x.updateIn(['list', 2, 'a'], () => 'xxx');
      expect(y.getIn(['list', 2, 'a'])).toEqual('xxx');
      
      const z: TypeRecored = y.setIn(['list', 2, 'c'], 'yyy');
      expect(z.getIn(['list', 2]).size).toEqual(3);
      expect(z.getIn(['list', 2, 'c'])).toEqual('yyy');
    });
  });
  
  describe('for..of', () => {
    it('should working fine for..of of Map', () => {
      const m: Map<string, string> = Map<string>({a: 'a', b: 'b', c: 'c'});
      expect(m.size).toEqual(3);
      
      const keys: string[] = [], values: string[] = [];
      for (const [k, v] of m) {
        keys.push(k);
        values.push(v);
      }
      
      expect(keys.join('')).toEqual('abc');
      expect(values.join('')).toEqual('abc');
    });
    
    it('should working fine for..of of Record', () => {
      interface ABC {
        a: string;
        b: string;
        c: string;
      }
      
      type ABCRecord = Record.Instance<ABC> & Readonly<ABC>;
      
      const r: ABCRecord = Record<ABC>({a: 'a', b: 'b', c: 'c'})();
      
      const keys: string[] = [], values: string[] = [];
      for (const [k, v] of r) {
        keys.push(k);
        values.push(v);
      }
      
      expect(keys.join('')).toEqual('abc');
      expect(values.join('')).toEqual('abc');
    });
  });
  
  describe('Type casting', () => {
    it('type casting of List', () => {
      const list: List<number> = List([1, 2, 3, 4, 5]);
      console.log('immutable.test.ts..()', list.toArray());
      console.log('immutable.test.ts..()', list.toIndexedSeq());
      console.log('immutable.test.ts..()', list.toJSON());
      console.log('immutable.test.ts..()', list.toObject());
      console.log('immutable.test.ts..()', list.toMap());
      console.log('immutable.test.ts..()', list.toKeyedSeq());
    });
  });
});

