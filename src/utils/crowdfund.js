import gql from 'graphql-tag'
import apolloClient from '../utils/graphql'
import burnApolloClient from '../utils/burnVoucher'

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

export function getBurnLogs(params) {
    console.log(params)
    return burnApolloClient.query({
        query: gql`query ($first: Int!,$skip: Int!) {
            logs(first: $first, skip: $skip) {
                id
                from
                token
                mid
                amount
                timestamp
            }
        }`,
        variables: params
    })
}
