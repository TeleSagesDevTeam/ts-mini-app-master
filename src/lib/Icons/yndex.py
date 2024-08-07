import os

# The output file name
output_file = 'index.js'

# Get all .svelte files in the current directory
icon_files = [f for f in os.listdir('.') if f.endswith('.svelte')]

# Create the export statements
export_statements = [
    f"export {{ default as {os.path.splitext(f)[0]}Icon }} from './{f}'"
    for f in icon_files
]

# Write the export statements to the output file
with open(output_file, 'w') as file:
    file.write('\n'.join(export_statements) + '\n')

print(f'Export statements have been written to {output_file}.')
