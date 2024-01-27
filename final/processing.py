import pandas as pd

# Load your dataset here, replace 'path_to_your_dataset.csv' with the path to your dataset
df = pd.read_csv('./educ_uoe_enrt01_linear.csv')

# Visualization 1: Total Number of Students by Sex for the Latest Year
latest_year = df['TIME_PERIOD'].max()
data_viz1 = df[df['TIME_PERIOD'] == latest_year].groupby('sex')['OBS_VALUE'].sum().reset_index()
data_viz1.to_json('data_viz1.json', orient='records')  # Save to JSON

# Visualization 2: Enrollment Trends Over Time by Education Level
data_viz2 = df.groupby(['TIME_PERIOD', 'isced11'])['OBS_VALUE'].sum().reset_index()
data_viz2.to_json('data_viz2.json', orient='records')  # Save to JSON

# Visualization 3: Program Orientation and Type of Institution
# Assuming 'isced11' represents program orientation and 'sector' represents the type of institution
data_viz3 = df.groupby(['isced11', 'sector'])['OBS_VALUE'].sum().reset_index()
data_viz3.to_json('data_viz3.json', orient='records')  # Save to JSON

# Visualization 4: Geographical Distribution of Students
# Assuming 'geo' represents geographical location
data_viz4 = df.groupby(['geo'])['OBS_VALUE'].sum().reset_index()
data_viz4.to_json('data_viz4.json', orient='records')  # Save to JSON

# Visualization 5: Intensity of Participation
# Assuming 'worktime' represents the intensity of participation (e.g., Full-time, Part-time)
data_viz5 = df.groupby(['worktime'])['OBS_VALUE'].sum().reset_index()
data_viz5.to_json('data_viz5.json', orient='records')  # Save to JSON