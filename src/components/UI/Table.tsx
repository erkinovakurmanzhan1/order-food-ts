import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Column } from '../../common/types'
import useClientSidePagination from '../../hooks/useClientSidePagination'

type Props<T> = {
  columns: Column<T>[]
  rows: T[]
  getUniqueId: (val: T) => string
  withPagination?: boolean
}
const AppTable = <T,>({
  columns,
  rows,
  getUniqueId,
  withPagination = true,
}: Props<T>) => {
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginate,
  } = useClientSidePagination()

  return (
    <Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={`header-${column.key}`}
                    align={column.align || 'left'}
                    style={column.minWidth ? { minWidth: column.minWidth } : {}}
                  >
                    <ColumnsHeaderStyle>{column.header}</ColumnsHeaderStyle>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginate(rows).map((row, rowIndex) => {
                return (
                  <TableRow hover tabIndex={-1} key={getUniqueId(row)}>
                    {columns.map((column) => {
                      if (column.render) {
                        return (
                          <TableCell key={column.key}>
                            {column.render(row)}
                          </TableCell>
                        )
                      }
                      const value = column.index
                        ? rowIndex + 1
                        : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          row[column.key]
                      return (
                        <TableCell
                          key={`row-${column.key}`}
                          align={column.align}
                        >
                          <RowTitle>{value}</RowTitle>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {withPagination && (
          <TablePaginationStyled
            rowsPerPageOptions={[10, 50, 100]}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => handleChangePage(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Grid>
  )
}
export default AppTable
const TablePaginationStyled = styled(TablePagination)`
  display: flex;
  justify-content: center;
`
const ColumnsHeaderStyle = styled('p')`
  font-size: 16px;
  font-weight: 600;
`
const RowTitle = styled('p')`
  font-size: 16px;
  font-weight: 400;
`
