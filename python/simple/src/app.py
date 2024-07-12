import pandas as pd

df: pd.DataFrame  = pd.read_csv("data.csv")
dfg: pd.DataFrame = df.groupby("user_id").agg({
    "transaction_price": ["sum", "mean"], 
    "transaction_id": "nunique"
})
print(dfg)
