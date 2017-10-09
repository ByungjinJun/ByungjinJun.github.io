---
layout: post
title:  "Nearest Neighbors"
date:   2017-10-09 13:50:25 -0500
categories: Machine Learning
---

###### **I acknowledge that contents of this positing is based on 2017 Fall EECS349 course by Prof. Bryan Pardo at Northwestern Universtiy. I post this for the learning purpose of myself.**



##**1. Introduction to the Nearest Neighbor learning**

Supervised learning의 중요한 기초 토픽 중 하나는 Instance-based learning이다. Instance-based learning에서 비교하는 트레이닝 인스턴스들이 메모리에 저장되어 있기 때문에 memory-based learning이라고도 한다. Lazy learning이라고도 하는데, 이에 대해서는 [Lazy learning](https://en.wikipedia.org/wiki/Lazy_learning) 참조. (반대는 [Eager learning](https://en.wikipedia.org/wiki/Eager_learning))

> **Why is it Instance-based?**
> 
> &nbsp;&nbsp; 모델의 hypotheses를 트레이닝 instances를 바탕으로 세우기 때문이다. 즉, 데이터의 복잡도가 증가함에 따라 해당 hypothesis의 복잡도가 증가할 수 있다는 것.


대표적인 instance-based learning 중 하나가 바로 Nearest neighbor learning이며, 그 중에서도 kNN, kernel regression 등이 잘 알려져 있다.

**기본적인 알고리즘의 흐름**은 이렇다.
1. 출력값(output)을 알고 있는 기존 케이스들에서 example set을 선택한다.
2. 새로운 케이스를 보면, 가장 유사한 알려진 케이스를 선택해서 그 출력값을 새로운 케이스의 출력값으로 선택한다.

수식으로 표현하면 요렇다.
* example set 
$$X = {\vec{x_1}, ..., \vec{x_n}}$$
* 각 example 내의 attributes
$$\vec{x_1} = < a_1, ..., a_k>$$
* X에서 유한한 Y로 매핑하는 Target fuction
$$f : X \to Y$$
* Data (example, target function output)
$$D=<\vec{x_1},f(\vec{x_1})>, ..., <\vec{x_m},f(\vec{x_m})>$$
* hypothesis h
$$\forall \vec{x},  h(\vec{x}) \approx f(\vec{x})$$ 
* 새로운 데이터 => query point
$$\vec{x_q}$$



##**2. Single Nearest Neighbor**

단일 최근접 알고리즘에서는는 위의 DATA를 기반으로 query point를 계산하고, 아웃풋을 선택한다.
이를 univariate(단일 변수) 그래프로 설명해보면..

![alt text](http://byungjinjun.githun.io/_post/img_2017-10-09-NN/fig_single_NN "single NN")[^1]

위 그래프에서 쿼리 포인트인 붉은 점은 근처 점들의 위치를 비교해서 더 가까운 오른쪽 점과 같은 값 (f(x) = 2) 을 취한다.

> **single NN**은 아래와 같은 특성을 갖는다. 
- 거리 측정 기준 : 통상 Euclidean
- 고려하는 이웃 숫자 : 1
- weight: 안 씀
- 이웃을 고려한 출력값 : 최근접 이웃과 동일한 값



##**3. K-nearest Neighbor**

그런데 요즘 누가 이웃 하나랑만 비교를 하나? 그러므로 우리는 k개의 이웃과 비교를 한다.

> **kNN**은 아래와 같은 특성을 갖는다. 
- 거리 측정 기준 : Euclidean
- 고려하는 이웃 숫자 : K
- weight: 안 씀
- 이웃을 고려한 출력값
    1. Regression: K개의 가까운 이웃들의 평균값
    2. Classification: K개의 가까운 이웃들 중 가장 대표적인 값


위 특성들을 보면 의문점들이 발생(해야) 한다.

**1. K는 어떻게 결정하는가?**

    - K가 너무 작으면 overfitting이 발생한다. 왜? 너무 적은 수의 값들을 고려하다보면 noise가 쉽게 발생한다.
    - K가 너무 크면 underfitting이 발생하겠지 맥락상. 그런데 왜? 너무 많은 값들을 고려하다보니 유의미한 차이를 만들어낼 수 없다. 같이 묶이지 말아야 할 놈들도 같이 묶인다는 것이다.
    - 그래서 어떻게 결정하냐고. => empirically. 컴퓨터 좋은 게 뭐냐. 만들어서 실험 돌려본다. 이 때 이용하는 것이 cross-validation.


**2. Regression과 Classification은 어떻게 결정하는가?**

    - 과제야. 나도 몰라 아직.
    - 여하튼 kNN regression sample이 아래와 같이 있다.

![alt text](http://byungjinjun.githun.io/_post/img_2017-10-09-NN/fig_kNN "kNN")[^2]

    그래프 내부 내용은 중요치 않다. 중요한 것은 데이터의 형태에 따라 문제점들이 발생할 수 있다는 것이다. 특히 kNN의 경우에는 데이터 분포의 끝단에서 이러한 문제점들이 많이 발생한다.



##**4. Kernel Regression**

그래서 Kernel Regression을 사용한다.
> **Kernel Regression**에 지금까지와 같은 기준을 들이대보자.
    - 거리 측정 기준 :  **scaled** Euclidean
    - 고려하는 이웃 숫자 : **All of them**
    **- weight**
    $$w_i = \exp\Bigl(\frac{-d(x_i, x_q)^2}{K_W^2}\Bigl)$$
        - 분자: 쿼리 포인트와 한 데이터 포인트 간 거리의 제곱
        - 분모: Kernel Width, X축의 너비 대한 비율. 즉 가까울수록 가중치를 더 준다.
    **- 이웃을 고려한 출력값(가중치 적용된 평균)**
    $$h(x_q) = \frac{\sum_i w_i \cdot f(x_i)}{\sum_i w_i}$$

![alt text](http://byungjinjun.githun.io/_post/img_2017-10-09-NN/fig_kernel_regression "kernel regression")[^3]

    kNN과 비교했을 때 끝단에 위치한 데이터 포인트들에서 훨씬 러닝이 잘 되고 있음을 알 수 있다. 그런데 뭐든지 과하면 안된다는 옛말처럼, 과하게 weight를 잡다가는 overfitting 문제가 또 발생할 수 있다...


**중간정리**를 하자면, kNN이나 Kernel Regression이나 모두 간단하고 강력한 알고리즘이다.

    1. 일단 둘다 noise에 강하고,
    2. 트레이닝 데이터가 충분할 때 효과적이고,
    3. 각 query마다 적용할 수 있고,
    4. 새로운 트레이닝 데이터가 추가되었을 때 쉽게 적용할 수 있다.

하지만 **문제점**도 있다.

    1. 여러 dimension들을 다룰 때 가중치를 어떻게 결정할 것인가?
    2. 관계없는 dimension은 어떻게 식별하여 제거할 것인가.
    3. 새 query 하나 labeling 하는데 연산량이 높다.
    4. 공간을 많이 사용한다.



##**5. Locally Weighted (Linear) Regression**

속칭 LWR. 일반적인 Regression은 global값을 사용해서 연산량이 많고 공간을 많이 사용하는 단점이 있다. LWR은 이를 극복하기 위해 local값을 사용한다. 로컬값들을 이용해서 출력값을 추정하고, Kernel regression의 가중치 값을 이용하여 에러를 보정한다.(귀찮)

![alt text](http://byungjinjun.githun.io/_post/img_2017-10-09-NN/fig_LWR "Locally Weighted Regression")[^4]

결과 그래프는 위와 같이 나온다. Kernel regression과 비교했을 때, 적은 연산으로도 끝단값에서의 그래프가 훨씬 스무스해진 것을 볼 수 있다. 하지만 역시 overfitting을 식별해야하는 문제가 남는다. 그리고 "적은 연산"은 또 어떤 기준으로 산정할 거냐고.

+ linear 대신 polynomial 값들을 쓸 수 있다. 차이점에 대해서는 공부 요.



##**6. Conclusion**

   이 모든 memory-based learning들은 새 training example들을 쉽게 사용할 수 있고, 새로운 query들을 hypothesis에 적용하는 작업도 상당히 쉽다는 것이 강점이다.
   단점은 뻔하다. 모든 트레이닝 셋을 메모리에 싣기 위해서는 메모리를 많이 점유하고, 또 새 query를 적용하는데 오래 걸린다. 그리고, 안 그래도 오래 걸리는 놈 주제에 데이터 사이즈가 늘어날수록 기하급수적으로 더 시간을 많이 잡아먹는다는 점.

------------------------------------------------------------

[^1]: Taken from the slide in 2017 Fall EECS349 class at NU.

[^2]: Ibid.

[^3]: Ibid.

[^4]: Ibid.