from beaker import *
from pyteal import *

class TrustChainState:
    count = GlobalStateValue(
        stack_type=TealType.uint64,
        default=Int(0),
        descr="Report counter"
    )

app = Application("TrustChain", state=TrustChainState)

@app.create
def create():
    return app.state.count.set(Int(0))

@app.external
def submit_report(reporter: abi.Address, report_hash: abi.String, *, output: abi.Uint64):
    return Seq(
        App.box_put(report_hash.get(), reporter.get()),
        app.state.count.set(app.state.count + Int(1)),
        output.set(app.state.count.get()),
    )