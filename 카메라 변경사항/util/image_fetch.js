//uri로 이미지 가져오기
export default class ImageFetch {
    #url;
    #listener;

    constructor(url,listener) {
        this.#url=url;
        this.#listener=listener;
    }

    async start() {
        var response = await fetch(this.#url).catch(()=>{const listener = this.#listener.bind(); listener();});
        return response;
    }
}