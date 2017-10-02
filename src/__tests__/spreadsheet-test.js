'use strct';

jest.dontMock('../spreadsheet');

import React from 'react';
import renderer from 'react-test-renderer';

import SpreadsheetComponent from '../spreadsheet';

const testVars = {
  initialData: {
    rows: [
        ['', '', '', '', '', '', '', ''],
        ['', 1, 2, 3, 4, 5, 6, 7],
        ['', 1, '', 3, 4, 5, 6, 7],
        ['', 1, 2, 3, 4, 5, 6, 7],
        ['', 1, 2, 3, 4, 5, 6, 7]
    ]
  },
  config: {
    rows: 5,
    columns: 8,
    hasHeadColumn: true,
    isHeadColumnString: true,
    hasHeadRow: true,
    isHeadRowString: true,
    canAddRow: true,
    canAddColumn: true,
    emptyValueSymbol: '-',
    hasLetterNumberHeads: true
  }
};

describe('Spreadsheet', () => {
  it('Renders a spreadsheet', () => {
    let spreadsheet = renderer.create(
       <SpreadsheetComponent
          initialData={testVars.initialData}
          config={testVars.config}
          cellClasses={testVars.cellClasses}
          spreadsheetId="test-id" />
    ).toJSON();    
    expect(spreadsheet).toMatchSnapshot;
  });
});