
export function getData(url, verb, cache){
    return fetch(url, {method: verb, cache: cache,}).then((resp) => {
        if (resp.status === 200) return resp.json();
        else throw new Error("Invalid response");
      });
  };
