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
import { Button, Container, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { format, parseISO } from 'date-fns'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { Token, validateAuth } from '../../utils/auth'
import { http } from '../../utils/http'
import { Transaction } from '../../utils/models'

interface TransactionsPageProps {
  transactions: Transaction[]
}

const columns: Column[] = [
  {
    name: 'payment_date',
    title: 'Data pag.',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy')
    },
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
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy')
    },
  },
]

const TransactionsPage: NextPage<TransactionsPageProps> = (props) => {
  const router = useRouter()
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas transações
      </Typography>
      <Button
        startIcon={<AddIcon />}
        variant={'contained'}
        color="primary"
        onClick={() => router.push('/transactions/new')}
      >
        Criar
      </Button>
      <Grid rows={props.transactions} columns={columns}>
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

export default TransactionsPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = validateAuth(ctx.req)
  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }

  const token = (auth as Token).token

  const { data: transactions } = await http.get('/transactions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    props: {
      transactions,
    },
  }
}
