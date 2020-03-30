import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MaterialTable from 'material-table';
// core components
import styles, { colorStyles } from 'assets/jss/material-dashboard-react/components/tableStyle';

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, countRows, options } = props;
  return (
    <div className={classes.tableContainer}>
      <MaterialTable
        title=''
        columns={countRows ? [{ title: '#' }, ...tableHead] : tableHead}
        data={tableData}
        options={{
          toolbar: false,
          headerStyle: colorStyles[`${tableHeaderColor}TableHeader`],
          draggable: false,
          ...options
        }}
        components={{
          Container: props => <div>{props.children}</div>,
          Body: props => (
            <TableBody>
              {props.renderData.map((rowData, rowKey) => (
                <TableRow key={rowKey} className={classes.tableBodyRow}>
                  {countRows && <TableCell className={classes.tableCell}>{rowKey + 1}</TableCell>}
                  {tableHead.map((col, cellKey) => (
                    <TableCell className={classes.tableCell} key={cellKey}>
                      {rowData[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )
        }}
      />
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
  countRows: false,
  options: {}
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf(['warning', 'primary', 'danger', 'success', 'info', 'rose', 'gray']),
  tableHead: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.object),
  countRows: PropTypes.bool,
  options: PropTypes.object
};
