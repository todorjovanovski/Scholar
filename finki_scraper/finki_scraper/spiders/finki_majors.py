from typing import Any

import scrapy
from scrapy.http import Response


class FinkiMajorsSpider(scrapy.Spider):
    name = "finki_majors"
    allowed_domains = ["finki.ukim.mk"]
    start_urls = ["https://www.finki.ukim.mk/mk/dodiplomski-studii"]

    def parse(self, response: Response, **kwargs: Any):
        majors = response.css("div.region.region-content section.block-views:first-of-type div.view-content ul > li")

        for li in iter(majors):
            name_parts = li.css("div > a *::text").getall()
            name = " ".join(part.strip() for part in name_parts if part.strip())
            link = li.css("div > a::attr(href)").get()

            if link:
                yield response.follow(
                    link,
                    callback=self.parse_major_page,
                    meta={"name": name, "url": response.urljoin(link)}
                )

    @staticmethod
    def parse_major_page(response):
        major_name = response.meta.get("name")

        description = response.css(
            "#block-system-main > div > div > div > div:nth-child(7) > div:nth-child(2) > p::text"
        ).get()

        curriculum = response.css(
            "#block-system-main > div > div > div > div:nth-child(7) > div:nth-child(4) > p::text"
        ).get()

        semesters = response.css("div.col-md-6.col-sm-12")
        semester_data = []

        for semester in semesters:
            semester_title = semester.css("h3 span::text").get()
            subjects = []
            rows = semester.css("table tr")[2:]

            for row in rows:
                subject_code = row.css("td:nth-child(1) span::text").get()
                subject_name = row.css("td:nth-child(2) a::text").get()
                subject_link = row.css("td:nth-child(2) a::attr(href)").get()

                if subject_code and subject_name:
                    subjects.append({
                        "code": subject_code,
                        "name": subject_name,
                        "link": response.urljoin(subject_link)
                    })

            semester_data.append({
                "semester": semester_title,
                "subjects": subjects
            })

        yield {
            "major": major_name,
            "description": description,
            "curriculum": curriculum,
            "semesters": semester_data
        }
