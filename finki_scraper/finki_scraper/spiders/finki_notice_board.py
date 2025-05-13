from typing import Any
import scrapy
from scrapy.http import Response


class FinkiNoticeBoardSpider(scrapy.Spider):
    name = "finki_notice_board"
    allowed_domains = ["finki.ukim.mk"]
    start_urls = ["https://www.finki.ukim.mk/mk/student-announcement"]

    def parse(self, response: Response, **kwargs: Any):
        links = response.css(".view-content .views-row .announcement-tile h4 span a")

        for link in iter(links):
            href = link.attrib["href"]
            title = link.css("::text").get(default="").strip()
            yield response.follow(href, callback=self.parse_announcement, meta={"title": title})

        next_page = response.css("li.pager-next a::attr(href)").get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)

    @staticmethod
    def parse_announcement(response: Response):
        content_div = response.css("#block-system-main .field-name-body .field-item")

        headers = content_div.css("h1, h2, h3, h4, h5, h6::text").getall()
        paragraphs = content_div.css("p::text").getall()

        all_text = headers + paragraphs
        description = "\n".join([t.strip() for t in all_text if t.strip()])

        yield {
            "url": response.url,
            "title": response.meta.get("title", ""),
            "description": description,
        }
