```
val frequencieMap = list.mapNotNull { freq ->
    freq.knFrequencyTime?.let { ft ->
        freq.knFrequencyTimeUnit?.let { ftu ->
            freq.knFrequencyNum?.let { fn ->
                freq.knFrequencyNumUnit?.let { fnu ->
                    HealthPlanRule(
                        id = freq.knId,
                        frequencyTime = ft,
                        frequencyTimeUnit = TimeServiceUnit.valueOf(ftu),
                        frequencyNum = fn,
                        frequencyNumUnit = TimeServiceUnit.valueOf(fnu),
                        frequencyMaxNum = freq.knFrequencyMaxNum,
                    )
                }
            }
        }
    }

}
```