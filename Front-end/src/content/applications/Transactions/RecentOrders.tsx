import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { getRequest } from 'src/util/axiosInstance';
import { Product } from 'src/models/product';



function RecentOrders() {
  const [products, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const request = await getRequest({
        url: `http://localhost:5000/products`
      });
      const products = request.data;
      setProduct(products);
    } catch (error) {
      console.log("No products was found here");
    }
  };

  return (
    <Card>
      <RecentOrdersTable products={products} />
    </Card>
  );
}

export default RecentOrders;