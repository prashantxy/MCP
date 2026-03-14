import axios from "axios";

export async function fetchRepoFiles(repo:string){
    const [owner,name]= repo.split("/");
    const url = `https://api.github.com/repos/${owner}/${name}/contents`;
    const res = await axios.get(url);
    return res.data;
}