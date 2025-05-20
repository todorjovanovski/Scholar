from typing import Any

import scrapy
import re
from scrapy.http import Response


class FinkiStaffSpider(scrapy.Spider):
    name = "finki_staff"
    allowed_domains = ["finki.ukim.mk"]
    start_urls = ["https://www.finki.ukim.mk/mk/staff-list/kadar/nastaven-kadar"]

    def parse(self, response: Response, **kwargs: Any):
        for staff in iter(response.css("div.view-content h2 a")):
            name = staff.css("::text").get().strip()
            link = staff.attrib["href"]
            yield response.follow(
                url=response.urljoin(link),
                callback=self.parse_staff_profile,
                meta={"name": name}
            )

    @staticmethod
    def parse_staff_profile(response: Response):
        description_paragraphs = response.css(
            "#bootstrap-panel-body div.collapsible.col-sm-8 div > div > div > div > p::text"
        ).getall()
        description = "\n".join(p.strip() for p in description_paragraphs if p.strip())

        script_content = response.css('script:contains("konsultacii")::text').get()

        consultative_info = ""
        if script_content:
            match = re.search(r'konsultacii[\'"]>\s*(.*?)<\/div>', script_content, re.DOTALL)
            if match:
                raw_html = match.group(1)
                consultative_info = re.sub(r'<[^>]+>', '', raw_html).replace('\\n', '\n').strip()

        yield {
            "name": response.meta.get("name"),
            "description": description,
            "consultative_terms": consultative_info
        }
