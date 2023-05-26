import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
// import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Product } from 'src/models/product';

interface RecentOrdersTableProps {
  className?: string;
  products: Product[];
}

// interface Filters {
//   status?: CryptoOrderStatus;
// }

// const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
//   const map = {
//     failed: {
//       text: 'Failed',
//       color: 'error'
//     },
//     completed: {
//       text: 'Completed',
//       color: 'success'
//     },
//     pending: {
//       text: 'Pending',
//       color: 'warning'
//     }
//   };

//   const { text, color }: any = map[cryptoOrderStatus];

//   return <Label color={color}>{text}</Label>;
// };

// const applyFilters = (
//   cryptoOrders: CryptoOrder[],
//   filters: Filters
// ): CryptoOrder[] => {
//   return cryptoOrders.filter((cryptoOrder) => {
//     let matches = true;

//     if (filters.status && cryptoOrder.status !== filters.status) {
//       matches = false;
//     }

//     return matches;
//   });
// };

const applyPagination = (
  products: Product[],
  page: number,
  limit: number
): Product[] => {
  return products.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedProduct.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  // const [filters, setFilters] = useState<Filters>({
  //   status: null
  // });

  // const statusOptions = [
  //   {
  //     id: 'all',
  //     name: 'All'
  //   },
  //   {
  //     id: 'completed',
  //     name: 'Completed'
  //   },
  //   {
  //     id: 'pending',
  //     name: 'Pending'
  //   },
  //   {
  //     id: 'failed',
  //     name: 'Failed'
  //   }
  // ];

  // const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   let value = null;

  //   if (e.target.value !== 'all') {
  //     value = e.target.value;
  //   }

  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     status: value
  //   }));
  // };

  const handleSelectAllProduct = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProduct(
      event.target.checked
        ? products.map((product) => product.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    productId: string
  ): void => {
    if (!selectedProduct.includes(productId)) {
      setSelectedProduct((prevSelected) => [
        ...prevSelected,
        productId
      ]);
    } else {
      setSelectedProduct((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  // const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedProducts = applyPagination(
    products,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedProduct.length > 0 &&
    selectedProduct.length < products.length;
  const selectedAllCryptoOrders =
  selectedProduct.length === products.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          // action={
          //   <Box width={150}>
          //     <FormControl fullWidth variant="outlined">
          //       <InputLabel>Status</InputLabel>
          //       <Select
          //         value={filters.status || 'all'}
          //         onChange={handleStatusChange}
          //         label="Status"
          //         autoWidth
          //       >
          //         {statusOptions.map((statusOption) => (
          //           <MenuItem key={statusOption.id} value={statusOption.id}>
          //             {statusOption.name}
          //           </MenuItem>
          //         ))}
          //       </Select>
          //     </FormControl>
          //   </Box>
          // }
          title="Products"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllProduct}
                />
              </TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Caculation Unit</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {paginatedProducts.map((product) => {
              const isProductSelected = selectedProduct.includes(
                product.id
              );
              return (
                <TableRow
                  hover
                  key={product.id}
                  selected={isProductSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isProductSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, product.id)
                      }
                      value={isProductSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {product.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {product.name}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {product.caculationUnit}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {product.amount}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {product.price}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {product.TotalPrice}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={products.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  products: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  products: []
};

export default RecentOrdersTable;