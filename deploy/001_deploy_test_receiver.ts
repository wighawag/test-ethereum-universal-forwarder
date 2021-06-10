import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  const ForwarderRegistry = await deployments.get('ForwarderRegistry');
  const UniversalForwarder = await deployments.get('UniversalForwarder');

  await deploy('TestUniversalForwardingReceiver', {
    from: deployer,
    args: [ForwarderRegistry.address, UniversalForwarder.address],
    log: true,
  });
};
export default func;
func.tags = ['TestUniversalForwardingReceiver'];
func.dependencies = ['ForwarderRegistry', 'UniversalForwarder'];
