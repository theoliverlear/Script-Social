export interface HtmlGenerative {
    getHtmlString(): string | Promise<string>;
    getHtml(): HTMLDivElement | Promise<HTMLDivElement>;
}