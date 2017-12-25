# ApplicationInsights-Expo

Leverage [Azure Application Insights](https://azure.microsoft.com/documentation/articles/app-insights-overview/) in [Expo](https://expo.io/).

*WARNING: This project is still under development.*

## Relationship to [ApplicationInsights-node.js](https://github.com/Microsoft/ApplicationInsights-node.js)

This project is reusing most of code from ApplicationInsights-node.js. This project provides all features except auto collect data.

Technically, this repository is declaring ApplicationInsights-mode.js repository as [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). When clone this repository, please specify the `--recurse-submodules` parameter:

```sh
git clone https://github.com/lijunle/ApplicationInsights-Expo.git --recurse-submodules
```

## LICENSE

MIT License.
