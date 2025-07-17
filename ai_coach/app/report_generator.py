from jinja2 import Environment, FileSystemLoader
import os

def generate_html_report(feedback_data, output_path="app/templates/index.html"):
    template_dir = os.path.join(os.path.dirname(__file__), "templates")
    env = Environment(loader=FileSystemLoader(template_dir))
    template = env.get_template("index.html")
    html_content = template.render(frames=feedback_data)

    with open(output_path, "w") as f:
        f.write(html_content)
