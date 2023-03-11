export const truncate = (text : string, symbols : number) => {
    return text?.length > symbols ? `${text.substr(0, symbols)}...` : text;
}