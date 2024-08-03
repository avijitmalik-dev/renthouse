import apiConfig from "../config"

export const singlePageloader = async({ request, params})=>{
    const resp = await apiConfig("/posts/" + params.id)
    return resp.data;
}

export const listPageloader = async({request, params}) =>{
    const query = request.url.split("?")[1]
    const resp = await apiConfig("/posts?" + query)
    return resp.data;
}

