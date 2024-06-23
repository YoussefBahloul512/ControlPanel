import os
import logging
import sys 

def create_component(component_name):
  """Creates a new component with HTML and SCSS files.

  Args:
    component_name: The name of the component to create.
  """
  template_path = os.path.join("src", "components", "template.html")
  component_html_path = os.path.join("src", "components", f"{component_name}.html")
  component_scss_path = os.path.join("src", "assets", "sass", f"{component_name}.scss")

  # Configure logging (optional)
  logging.basicConfig(filename='component_creator.log', level=logging.DEBUG)

  # Read the template file
  try:
    with open(template_path, "r", encoding="utf-8") as f:
      source = f.read()
  except FileNotFoundError:
    logging.error(f"Template file not found: {template_path}")
    return

  # Replace placeholder with component name
  content = source.replace("COMPONENT_NAME", component_name)

  # Check if component HTML already exists
  if os.path.exists(component_html_path):
    logging.error(f"{component_name}.html already exists, use another name")
    return

  # Create component HTML file
  try:
    with open(component_html_path, "w", encoding="utf-8") as f:
      f.write(content)
  except OSError as e:
    logging.error(f"Error creating {component_name}.html: {e}")
    return

  # Create empty component SCSS file
  try:
    with open(component_scss_path, "w", encoding="utf-8") as f:
      f.write("")
  except OSError as e:
    logging.error(f"Error creating {component_name}.scss: {e}")
    return

  # Open files in VS Code (optional)
  try:
    os.system(f"code -r {component_html_path}")
    os.system(f"code -r {component_scss_path}")
  except OSError as e:
    logging.error(f"Error opening files in VS Code: {e}")

  logging.info(f"{component_name} created successfully!")

# Get component name from command line argument (if provided)
if len(sys.argv) > 2:
  component_name = sys.argv[2]
  create_component(component_name)
else:
  logging.error("Please provide a component name as an argument.")
