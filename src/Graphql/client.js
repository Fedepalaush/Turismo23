import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';

 const wsLink = new WebSocketLink({
  uri: `ws://192.168.1.21:8082/v1/graphql`,
  options: { reconnect: true },
}); 

export default client = new ApolloClient({
     link:wsLink, 
     cache: new InMemoryCache()
   });