import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

d = {
    'a': [1, 1, 3, 1, 1, 3],
    'b': [1, 2, 2, 1, 2, 2],
    'c': [1, 1, 1, 0, 0, 0],
    'd': [0, 0, 0, 1, 1, 1]
}
df = pd.DataFrame(data=d)

sns.pairplot(df, hue='d')
plt.show()
