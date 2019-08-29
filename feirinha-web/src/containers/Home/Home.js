import React, {Component} from 'react';
import { Route } from 'react-router-dom';



class Home extends Component {

    render () {
        return (
            <div>
                <p>Sistema de Cadastro de feiras de rua</p>
                <p>Desenvolvido por Diogo Alexandro Pereira</p>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <a href="https://sites.google.com/view/diogoalexp/">
                                    <img src="https://lh3.googleusercontent.com/-KQTYx8Wui8sTgm7S89lkGX8fDUm0gKWxQKhlKxqhElSGQc3uzykH_5vw_eOmXxlSPO-1NvW8Wz79Bll_HFbTMLO_zjZWwrcGonFW3C-TzvP7F5otOGJJbAnafwWtPi76jJjm78sdRNy5ScqDWucpsCqcBfZAYkNKmSFnJSVKBNG0z0kMydBGNYMW1zloNUh5RU0uIXKuYvw4eNvjdt2n6Mj7oGGvd72hfDS0fAt_DOHswbu0lPlJHiitUXZKB4gwlN1g0Fbr7uGGmde2OaM2UIClTQyjk2pIWYIIRWU_A3PuAulob7CsbLxO005E3I8ONY5CktWHP7gWw8GID-phaarNPFmBnUzlcMizWNXxovT2ZZ5_mkm9e0-usqojFuOdEg5A9YGQooSlKREy6qiJi3LVbKBdQ-ZeKNsjhpjXuf1CjCth_Wo_xnvysmyoqiENely7kk-JHHARJM3ThFpv4uyz_QW7odwudvMZ9odYksQjjp3PyCiGdDwrTOZ8zFwuDhapW-VxeJwWZJ4SUkvxpCdZz_UjEqjdoNzSwjyVzaMZu1r9kwXKrsPejbPcSThrDcWAPnQ13A7Q39-Khf8dwsZp3PjoiyxSab5iYnreNLGfrfP-dkSXskzaj2QqrWeE_HTjeGeUeNeuvcRFoAvjZrdW1YPLt0=s16-no" />
                                </a>
                            </td>
                            <td>
                                <a href="mailto:diogoalexp@gmail.com">
                                    <img src="https://lh3.googleusercontent.com/NfS2dLr2gBG7Ryndq8v4D2CG9U9VnFLxhe3qgKGD7sxUUR3Kp7DeL4VKchcTaI4pFTVt3qgAP3wjSSuYkYqhOdRGAQdhUgE7r0yVz7a7Xa44HHtzMUIo3KSm3hRChFgdrOtriAEHI6bWeZ8gg285DuPuLFF5t2oSc8zON-ilCezSf_sKueY-ickUTEJRklCAOGaCPK8BPpflk5zGd4DPri5J8zGWLQWtiVmfV0J0A6Xn6ZnQO4Qxl-EXcK0DK_dy2vPXwvQMPxIGbavsZqrixxYeGKMx1osE940M-nEyvQnV0ja-DSvAm5tTifkDDnvL5hrvqbNkx3kzZaRGeTxDhyyu3EVYdJP06K3BhQIKFHXm8y3o3xZvidMR5F8t7RqDNyu4fdfcGM1nfZ6g0YxecxLwBT4QJvXWdLcmm8fzXSzEN7ZjtwkzMJ9CE9i2U-0a-okH9gqAoE4Ku6IAgnm8hkylSQxHkS3W-KXQChTwAeMZ550OZwruQjg_qqoowu6QnqylZSbSPF4Iibgeh3nSGnQCL1-m54_fembMatDo9oemi5_BoOcX70oM8Fq89QwLxQ-xROfI2KoZICFZdYXfUBhi2jm1W53vx5ZH1SQ=s32-no" />
                                </a>
                            </td>
                            <td>
                                <a href="https://facebook.com/diogo.alexandropereira/">
                                    <img src="https://lh3.googleusercontent.com/PfXLQzlisTAc5oedz1VBvik9K9XZqioLB0lxfzcX0jA_DdpnjkNfJI4BfvXuiZIW9-ZxRLnulU0aDDC3QlVV0FOpiZ5VcrS0WI_XvaMxAkubMCoCwkptG073ripyWHfHva4W9fyPf0K8cNwI8BrrCzlIVEojZKEoL0K5jL-rKdCqxGr5bGfOkf60GXLIZ-XovghGOiB1YNL3sR_PDASupjVu7EEQiBE3w6OYGe1BNdkP_inNs_UHTbNXk5IYnEOPTlF7wFAzxuLDic-fvbRvpog5N8pjNyP6_n7O3drs5srE3Q9BjKv-09JlBxvHOh1q9gzAxMQthUR-QqC79W8-zlYV_sIWuX86Q6hEY-nIsDcnus3-pyJDb8UPo-7rPms6PpYv7o1Nc9S-FgzRgP4Es7l5924oedOwmiKHpXzsNlXpHauGkyg7wJBQyQkSgbjGBvGnI_234AxTFX-fijFlxYm8aU3fW1TXAUZoxEN_wJYexZWfTAM6ayDlcinc8NQ5XG6dbinFuDdFSrJo9WENvdvBPTvxMuxHk8pG82stn68cLke4EUtdh-3YNfMKCcYsONWm2-RE-89sJSp4NJ0c49MGGhBk1eYGrZaHlH0=s32-no" />
                                </a>
                            </td>
                            <td>
                                <a href="https://linkedin.com/in/diogo-alexandro-pereira/">
                                    <img src="https://lh3.googleusercontent.com/ydqEtQ4R2WlJVMRQemp8-lakFj9AWew4se12Ti91kVCwJJd-5tSVREOW8JAutTlWNk-iUaHHImvvwv_hUKraLrMqdHz7cvTzRZmiQ9MmBC36qg6cdW2VSCMeKxVZop7XAq8m55AKRmYG6MlSIVU2CmK2csoYyqq_BjDY96kU_B-EboXto1BA-1weR-7Asx5-LxiXFQG7WH7nyOmlCjNKngYOTot6_dVt6e_uD59MSNgNyL-qs6lQTDsiFaQXKeat7XqNdgAlsOFAiWE00_1qp8wS6ADPgQaRkNZuQ8p7bpX4tu-HPP1nKuEEiO4CsxuEiXNvRFhl-lvL4QF7IjFJXgPRpvEN_fK2kly72xoMeLR8E1MIc44raNXSB8kaZ2-yK4cFpmKegHjAttFgqv_qm_Wdjw5QWv_wTPD3jOe0R2ubyl2ZdHwVI_ZOsPgNzhJ-pY6wANJ3iWD4nX4rB7cKHLPwGW4PetlMDu7p4K23YO3Ox2lkH75EEBLMGOSIUWCrwtvb8G3KqGLT0LI4zpqe0j-QPwbF4FmJnHecjpqOXsfkFaeN_d9h6mfs_pQoygKSyvebmNqfsNL6sFlkQEiN41B47p4tPMSyI7tWBpg=s32-no" />
                                </a>
                            </td>
                            <td>
                                <a href="https://github.com/diogoalexp">
                                    <img src="https://lh3.googleusercontent.com/j3i7DtvLvF-wf0HLwQn5SDbZDqtFFApefw-SUze5sp5kPyhzfbydrX29Td502yJtxwkwBlkuoSIsCoFh3tfFlJi8x2JFYujYMaoS18mCOdahlNMKYbfADrI6iS2U04x6Rv1eHC-3OoeGRfR7P96d2VXF-uo3YlR4c28Xb5KEVQlSC4PNyKLSHr4YLSxrWdjiXJ_y1wkgX8gH-Og4KyGv7FMq0AOhtmP2aD5TIkyaPATMpaGnvHM74jkyJK4mOYngwKRDgguzm0Xz4D9naZhuLcVSGSGKNBt-dPZ-L59ut35-jTn4KITgUaXZXQYonXzoLFWr1O_w4nMOGCNRrb4Oi_4u4FM5CbdDrP5NVtMBK6yduytu-4GpQ07W2vei1inEywteesO2DKKf31Dr-5juluCB8_20RaO6hbXz-BHTC0YzTo7M50uWQc2_H6ug_LPo1Rk9F83Yn6lD4V_7I4d0hp3nVOdw2znkAZS0e26M6i-Xemf1LRI-FSa6otgk-ngt16bT_31xNpiNYtiSHJmSGKACbA_8mgvd9Yg9e9r2V-x85dKFuZiYF84aRksufAKj95iubT0Ci5pj_UKL-2y0ynPy2nQOcoO1EbLSuCI=s32-no" />
                                </a>
                            </td>
                        </tr>  
                    </tbody>      
                </table>
            </div>
        );
    }
}

export default Home;