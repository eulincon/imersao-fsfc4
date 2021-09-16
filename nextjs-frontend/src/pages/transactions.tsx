import {
  Column,
  IntegratedFiltering,
  IntegratedPaging,
  PagingState,
  SearchState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Table,
  TableHeaderRow,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui'
import { Container, Typography } from '@material-ui/core'

const columns: Column[] = [
  {
    name: 'payment_date',
    title: 'Data pag.',
  },
  {
    name: 'name',
    title: 'Nome',
  },
  {
    name: 'category',
    title: 'Categoria',
  },
  {
    name: 'type',
    title: 'Operação',
  },
  {
    name: 'created_at',
    title: 'Criado em',
  },
]

export default function transactionsPage() {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas transações
      </Typography>
      <Grid rows={[]} columns={columns}>
        <SearchState defaultValue="Conta de luz" />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <Table />
        <TableHeaderRow />
        <IntegratedFiltering />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <IntegratedPaging />
      </Grid>
    </Container>
  )
}
