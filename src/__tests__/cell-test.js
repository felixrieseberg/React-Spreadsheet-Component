'use strict'

jest.dontMock('../cell');

import React from 'react';
import renderer from 'react-test-renderer';

import CellComponent from '../cell';

const testVars =  {
  key: 'row_0000_cell_1',
  uid: [0, 0],
  val: 'test',
  spreadsheetId: '1',
  selected: false,
  editing: false
};

describe('Cell', () => {
  it('Renders a cell', () => {
    const cell = renderer.create(
      <table>
        <tbody>
          <tr>
            <CellComponent 
              uid={testVars.uid} 
              key={testVars.key} 
              value={testVars.val} 
              spreadsheetId={testVars.spreadsheetId}
              selected={testVars.selected}
              editing={testVars.editing}
            />
          </tr>
        </tbody>
      </table> 
      ).toJSON();
    expect(cell).toMatchSnapshot()
  });
});