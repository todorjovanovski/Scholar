from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from finki_scraper.spiders import finki_majors, finki_notice_board, finki_staff

process = CrawlerProcess(get_project_settings())

process.crawl(finki_majors.FinkiMajorsSpider)
process.crawl(finki_notice_board.FinkiNoticeBoardSpider)
process.crawl(finki_staff.FinkiStaffSpider)

process.start()
