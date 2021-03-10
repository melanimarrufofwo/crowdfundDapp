import gql from 'graphql-tag'
import apolloClient from '../utils/graphql'

export function getCrowdfundList(params) {
    console.log(params)
    return apolloClient.query({
     query: gql`query ($first: Int!,$skip: Int!) {
        playerEntities(first: $first, skip: $skip,orderBy: date,orderDirection: desc) {
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