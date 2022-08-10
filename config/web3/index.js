import web3 from 'web3'
import {InjectedConnector} from '@web3-react/injected-connector'

const ETHEREUM_NERWORK_ID=5

export const connector = new InjectedConnector({
    supportedChainIds:[ETHEREUM_NERWORK_ID],
})

export const getLibrary = (provider) =>{
    const library = new web3(provider)
    return library
}
