import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';

import Product from '../components/Product';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Queries from '../utils/graphql/gqlQueries';


function HomePage() {
  const gqlQuery = new Queries();
  const { loading, error, data } = useQuery(gqlQuery.GET_PRODUCTS);

  return (
    <Container>
      <Helmet>
        <title>The Good Deals</title>
      </Helmet>
      <h1>New Products</h1>
      <div className='products'>
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : error ? (
          <div>
            <Message variant='danger'>{error.message}</Message>
          </div>
        ) : (
          <Row>
            {data.getProducts.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
}

export default HomePage;
