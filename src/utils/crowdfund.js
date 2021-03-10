import gql from 'graphql-tag'
import apolloClient from '../utils/graphql'

export function getCrowdfundList(params) {
    console.log(params)
    return apolloClient.query({
     query: gql`query ($first: Int!) {
        playerEntities(first: $first) {
            id
            date
            count
            player
            price
            }
        }`,
     variables: params
    })
   }