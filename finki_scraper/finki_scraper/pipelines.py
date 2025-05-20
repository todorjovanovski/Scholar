import json


class BaseJsonPipeline:
    first_item = True

    def __init__(self, json_file_name: str, target_spider_name: str) -> None:
        self.file = None
        self.json_file_name = json_file_name
        self.target_spider_name = target_spider_name
        super().__init__()

    def open_spider(self, spider):
        if spider.name == self.target_spider_name:
            self.file = open(f"data/{self.json_file_name}.json", "w", encoding="utf-8")
            self.file.write("[\n")

    def close_spider(self, spider):
        if spider.name == self.target_spider_name and self.file is not None:
            self.file.write("\n]")
            self.file.close()

    def process_item(self, item, spider):
        if spider.name == self.target_spider_name and self.file is not None:
            if not self.first_item:
                self.file.write(",\n")
            self.first_item = False
            line = json.dumps(dict(item), ensure_ascii=False, indent=2)
            self.file.write(line)
        return item


class MajorsPipeline(BaseJsonPipeline):
    def __init__(self) -> None:
        super().__init__("majors", "finki_majors")


class NoticeBoardPipeline(BaseJsonPipeline):
    def __init__(self) -> None:
        super().__init__("notice_board", "finki_notice_board")


class StaffPipeline(BaseJsonPipeline):
    def __init__(self) -> None:
        super().__init__("staff_data", "finki_staff")
