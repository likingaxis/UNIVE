$$  
P = \frac{TP}{TP + FP}  
$$

$$  
R = \frac{TP}{TP + FN}  
$$

$$  
accuracy = \frac{TP + TN}{TP + FP + FN + TN}  
$$

$$  
error = 1 - accuracy  
$$

$$  
F1 = \frac{2PR}{P + R}  
$$

$$  
Precision@K = \frac{\text{rilevanti nei primi }K}{K}  
$$

$$  
MAP = \frac{1}{|Q|} \sum_{q \in Q} AP(q)  
$$

$$  
CG = r_1 + r_2 + \dots + r_n  
$$

$$  
DCG_p = rel_1 + \sum_{i=2}^{p} \frac{rel_i}{\log_2 i}  
$$

$$  
NDCG = \frac{DCG}{IDCG}  
$$

$$  
RR = \frac{1}{K}  
$$

$$  
MRR = \frac{1}{|Q|} \sum_{q \in Q} \frac{1}{rank_q}  
$$

$$  
PMI(x,y) = \log \frac{P(x,y)}{P(x)P(y)}  
$$

$$  
p(R \mid d,q)=_{rank}p(d \mid R,q)  
$$

$$  
R(D(q)) =  
\sum_{d \in D(q)} C'(d,q)p(\bar{R} \mid d,q)  
+  
\sum_{d \notin D(q)} C(d,q)p(R \mid d,q)  
$$

$$  
v_d = (x_1,\dots,x_m)  
$$

$$  
x_i =  
\begin{cases}  
1 & \text{se } t_i \in d \  
0 & \text{altrimenti}  
\end{cases}  
$$

$$  
v_q = (y_1,\dots,y_m)  
$$

$$  
y_i =  
\begin{cases}  
1 & \text{se } t_i \in q \  
0 & \text{altrimenti}  
\end{cases}  
$$
$$  
O(R \mid v_d,v_q)

\frac{p(R \mid v_d,v_q)}  
{p(\bar{R} \mid v_d,v_q)}  
$$

$$  
p_i = p(x_i=1 \mid R,v_q)  
$$

$$  
u_i = p(x_i=1 \mid \bar{R},v_q)  
$$

$$  
p_i = \frac{r_i}{R}  
$$

$$  
u_i = \frac{df_i - r_i}{N - R}  
$$

$$  
p_i = 0.5  
$$

$$  
u_i \approx \frac{df_i}{N}  
$$

$$  
c_i =  
\log  
\frac{p_i(1-u_i)}  
{u_i(1-p_i)}  
$$

$$  
RSV_d =  
\sum_{i:x_i=y_i=1} c_i  
$$

$$  
RSV_d  
\approx  
\sum_{i:x_i=y_i=1}  
\log \frac{N}{df_i}  
$$

$$  
d_{t_i}=n_i  
$$

$$  
Poisson(x \mid \lambda)

\frac{e^{-\lambda}\lambda^x}{x!}  
$$

$$  
\lambda \approx \frac{CF_{t_j}}{N}  
$$

$$  
RSV_d =  
\sum_{t_i:y_i=1}  
n_i  
\log  
\frac{\rho_i}{\gamma_i}  
$$
 $$  
p(d_{t_i}=n_i \mid R,v_q)

p_i \cdot Poisson(n_i \mid \mu_i)  
+  
(1-p_i)\cdot Poisson(n_i \mid \bar{\mu}_i)  
$$

$$  
L_d = \sum_t tf_{t,d}  
$$
$$  
L_{ave}

\frac{1}{|D|}  
\sum_{d \in D}L_d  
$$

$$  
RSV_d =  
\sum_{t \in q}  
IDF(t)  
\cdot  
\frac{(k_1 + 1)tf_{t,d}}  
{k_1B + tf_{t,d}}  
$$
$$  
IDF(t)

\log  
\left(  
1+  
\frac{N-df[t]+0.5}  
{df[t]+0.5}  
\right)  
$$
$$  
IDF(t)

\log  
\left(  
\frac{N}{df_t}  
\right)  
$$

$$  
B =  
(1-b)+b\frac{|d|}{avgdl}  
$$

$$  
\frac{(k_3+1)tf_{t,q}}  
{k_3 + tf_{t,q}}  
$$

$$  
p(q \mid M_d)  
$$

$$  
M_d =  
{p(t \mid M_d) : t \in V}  
$$

$$  
p(q \mid M_d)  
\propto  
\prod_{t:tf_{t,q}>0}  
p(t \mid M_d)^{tf_{t,q}}  
$$

$$  
\hat{p}(t_i \mid M_d)

\frac{tf_{t_i,d}}{|d|}  
$$
$$  
p_{Lap}(t \mid d)

\frac{tf_{t,d}+1}  
{|d|+|V|}  
$$
$$  
p(t \mid M_c)

\frac{cf_t}{T}  
$$
$$  
p_{JM}(t \mid d)

\lambda  
\frac{tf_{t,d}}{|d|}  
+  
(1-\lambda)  
\frac{cf_t}{T}  
$$
$$  
p_{Dir}(t \mid d)

\frac{tf_{t,d}+\mu p(t \mid M_c)}  
{|d|+\mu}  
$$
 $$  
p_{Dir}(t \mid d)

\lambda_d p(t \mid \hat{M}_d)  
+  
(1-\lambda_d)p(t \mid \hat{M}_c)  
$$

$$  
\lambda_d =  
\frac{|d|}  
{|d|+\mu}  
$$
$$  
\log p_{Dir}(q \mid d)

\sum_{k=1}^{n}  
\log p_{Dir}(w_k \mid d)  
$$
$$  
score(d,q)

\sum_{t \in q}  
tf_{t,q}  
\log p_{Dir}(t \mid d)  
$$

$$  
O(J)  
$$

$$  
O(K\log J)  
$$

$$  
K < |A| \ll N  
$$

$$  
g(d)  
$$
$$  
\text{net-score}(q,d)

g(d)+\text{cosine}(q,d)  
$$
$$  
wf_{t,d}

1+\log(tf_{t,d})  
$$

$$  
UB_t =  
\max score_t(d)  
$$
$$  
\vec{\mu}(D)

\frac{1}{|D|}  
\sum_{d \in D}  
\vec{v}(d)  
$$
 $$  
\vec{q}_{opt}
\frac{1}{|C_r|}  
\sum_{\vec{d}_j \in C_r}  
\vec{d}_j

\frac{1}{|C_{nr}|}  
\sum_{\vec{d}_j \in C_{nr}}  
\vec{d}_j  
$$
$$  
\vec{q}_m
\alpha \vec{q}_0  
+  
\beta  
\frac{1}{|D_r|}  
\sum_{\vec{d}_j \in D_r}  
\vec{d}_j

\gamma  
\frac{1}{|D_{nr}|}  
\sum_{\vec{d}_j \in D_{nr}}  
\vec{d}_j  
$$

$$  
\alpha = 1  
$$

$$  
\beta = 0.75  
$$

$$  
\gamma = 0.15  
$$

$$  
A \in \mathbb{R}^{m \times n}  
$$

$$  
A = U\Sigma V^T  
$$

$$  
U \in \mathbb{R}^{m \times m}  
$$

$$  
\Sigma \in \mathbb{R}^{m \times n}  
$$

$$  
V^T \in \mathbb{R}^{n \times n}  
$$

$$  
A_k =  
U_k\Sigma_k V_k^T  
$$

$$  
U_k \in \mathbb{R}^{m \times k}  
$$

$$  
\Sigma_k \in \mathbb{R}^{k \times k}  
$$

$$  
V_k^T \in \mathbb{R}^{k \times n}  
$$

$$  
A_k =  
\sum_{i=1}^{k}  
\sigma_i u_i v_i^T  
$$

$$  
|A-A_k|_F  
$$

$$  
A =  
(U\Sigma^{1/2})  
(\Sigma^{1/2}V^T)  
$$

$$  
T_k =  
U_k\Sigma_k^{1/2}  
$$

$$  
D_k =  
\Sigma_k^{1/2}V_k^T  
$$

$$  
q_k =  
q^T U_k\Sigma_k^{-1}  
$$

$$  
\frac{  
\sum_{i=1}^{k}\sigma_i^2  
}{  
\sum_i \sigma_i^2  
}  
$$
$$  
cosine(q_k,d_k)

\frac{q_k \cdot d_k}  
{|q_k||d_k|}  
$$
$$  
P_{ij}

\frac{1}{outdeg(i)}  
$$

$$  
\sum_{j=1}^{n}P_{ij}=1  
$$

$$  
x_{next}=xP  
$$

$$  
a=aP  
$$

$$  
1+2\lfloor \log x \rfloor  
$$

$$  
h(x)  
\leftarrow  
\sum_{x \to y}a(y)  
$$

$$  
a(x)  
\leftarrow  
\sum_{y \to x}h(y)  
$$
$$  
A_{ij}

\begin{cases}  
1 & \text{se } i \to j \  
0 & \text{altrimenti}  
\end{cases}  
$$

$$  
h=Aa  
$$

$$  
a=A^Th  
$$

$$  
a=A^TAa  
$$

$$  
h=AA^Th  
$$
$$  
score_{norm}(d)

\frac{score(d)-min}  
{max-min}  
$$
$$  
hybrid(d)

BM25_{norm}(d)^\alpha  
\cdot  
kNN_{norm}(d)^{1-\alpha}  
$$
