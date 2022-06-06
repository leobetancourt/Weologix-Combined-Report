from weasyprint import HTML

if __name__ == "__main__":
    HTML("./index_.html").write_pdf("./reports/report.pdf")

    print("complete")

