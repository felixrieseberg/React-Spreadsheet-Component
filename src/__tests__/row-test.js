'use strict'

jest.dontMock('../row');

import React from 'react';
import renderer from 'react-test-renderer';

import RowComponent from '../cell';

const testVars = {
  cells: [],
  cellClasses: [],
  uid: [0],
  key: 'testkey',
  spreadsheetId: '0',
  className: 'cellComponent'
};

describe('Row', () => {
  it('Renders a row', () => {
    const row = renderer.create(
      <table>
        <tbody>
            <RowComponent
              cells={testVars.cells}
              cellClasses={testVars.cellClasses}
              uid={testVars.uid}
              key={testVars.key}
              spreadsheetId={testVars.spreadsheetId}
              className={testVars.className}
            />
        </tbody>
      </table> 
    ).toJSON();
    expect(row).toMatchSnapshot();
  });
});