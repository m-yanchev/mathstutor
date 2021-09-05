import React from "react";
import {Table, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography} from "@material-ui/core";

export default function Program({profile}) {

    const headCells = [
        {id: "date", label: "Дата занятия"},
        {id: "topic", label: "Тема урока"}
    ]

    return (
        <>
            <Toolbar>
                <Typography variant={"h2"}>
                    {"Назначение"}
                </Typography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headCells.map(cell => (
                                <TableCell>
                                    {cell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </>
    )
}