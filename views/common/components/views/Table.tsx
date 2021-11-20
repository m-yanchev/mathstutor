import React, {ReactNode} from "react"
import {
    TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Table as MUITable, Grid
} from "@mui/material";

type Props = {
    heads: HeadCell[],
    rows: Row[]
}
export type HeadCell = {
    id: string,
    label: string,
    align: 'center' | 'inherit' | 'justify' | 'left' | 'right',
    width?: number
}
type Row = {
    id: string,
    cells: (string | ReactNode)[]
}

export default function Table(props: Props) {

    const {heads, rows} = props
    const [page, setPage] = React.useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid container direction={"column"}>
            <TableContainer>
                <MUITable stickyHeader>
                    <TableHead>
                        <TableRow>
                            {heads.map(cell => (
                                <TableCell key={cell.id} variant={"head"} align={cell.align}
                                           style={{width: cell.width}}>
                                        {cell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                            <TableRow key={row.id}>
                                {row.cells.map((cell, i) => (
                                    <TableCell key={heads[i].id} align={heads[i].align}
                                               style={{width: heads[i].width}}>
                                            {cell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </MUITable>
            </TableContainer>
            {rows.length > 10 &&
            <TablePagination sx={{flexShrink: 0}}
                             count={rows.length}
                             component={"div"}
                             rowsPerPage={rowsPerPage}
                             page={page}
                             onPageChange={handleChangePage}
                             onRowsPerPageChange={handleChangeRowsPerPage}
                             rowsPerPageOptions={[10, 50, 100]}/>
            }
        </Grid>
    )
}