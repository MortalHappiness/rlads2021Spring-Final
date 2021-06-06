import time
import csv
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def crawl_reviews(filename, url):
    SLEEP_TIME = 3
    # We will get at most ((N_SCROLL + 1) * 10) reviews
    N_SCROLL = 39

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--lang=zh-TW")
    driver = webdriver.Chrome(options=options)

    driver.get(url)
    try:
        element = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "widget-pane-link")))
        element.click()
        for _ in range(N_SCROLL):
            time.sleep(SLEEP_TIME)
            pane = driver.find_elements_by_css_selector(
                "#pane div div div div div.section-scrollbox")[0]
            driver.execute_script(
                "arguments[0].scrollTop = arguments[0].scrollHeight", pane)
        time.sleep(SLEEP_TIME)
        soup = BeautifulSoup(driver.page_source, "html.parser")
        reviews = list(soup.find_all(
            "div", {"class": "section-layout"})[-1].children)
        temp = list()
        for i in range(0, len(reviews), 3):
            temp.append(reviews[i])
        reviews = temp
        rows = [["author_name", "rating", "text"]]
        for review in reviews:
            author_name = review.attrs["aria-label"]
            rating = review.select(
                ".ODSEW-ShBeI-H1e3jb")[0].attrs["aria-label"].split()[0]
            text = review.select(".ODSEW-ShBeI-text")[0].text
            rows.append([author_name, rating, text])
            with open(f"{filename}.csv", "w", newline="", encoding="utf-8") as fout:
                writer = csv.writer(fout)
                writer.writerows(rows)
    finally:
        driver.quit()
