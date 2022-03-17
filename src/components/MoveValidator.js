import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { wsMssgHeuristicpicture, wsMssgPlayfen } from '../actions/serverActions';
import genericAjaxLoaderActionTypes from '../constants/ajaxLoader/genericAjaxLoaderActionTypes';
import genericAjaxDialogActionTypes from '../constants/dialog/genericAjaxDialogActionTypes';
import Movetext from '../utils/Movetext.js';

const useStyles = makeStyles({
  table: {
    marginTop: 10,
    maxHeight: 300,
    display: 'flex',
    flexDirection: 'column-reverse'
  },
});

const MoveValidator = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.board.short_fen) {
      wsMssgPlayfen(state);
    }
  }, [state.board.short_fen]);

  return (
    <div>
      <TableContainer component={Paper} className={classes.table}>
        <Table stickyHeader aria-label="simple table">
          <TableBody>
            {
              Movetext.toRows(state.board.movetext).map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="right">{i + 1}</TableCell>
                  <TableCell align="right">{row.w}</TableCell>
                  <TableCell align="right">{row.b}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonGroup size="small" variant="text" aria-label="small button group">
        <Button
          startIcon={<ContentCopyIcon />}
          onClick={() => state.board.movetext ? navigator.clipboard.writeText(state.board.movetext) : null}
        >
          Copy
        </Button>
        <Button
          startIcon={<BarChartIcon />}
          onClick={() => {
            dispatch({ type: genericAjaxDialogActionTypes.OPEN });
            dispatch({ type: genericAjaxLoaderActionTypes.SHOW });
            wsMssgHeuristicpicture(state);
          }}
        >
          Heuristic Picture
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default MoveValidator;
