# **C++高频面试题完整版（超全考点+代码示例+速记口诀+分模块背诵）**

**整体背诵规划**：5天冲刺，高效吃透所有考点

Day1：指针引用+const修饰+深浅拷贝+类四大默认成员函数

Day2：面向对象三大特性+虚函数多态+继承重难点

Day3：内存分区+new/malloc+内存泄漏+STL全容器重难点

Day4：C++11/14/17新特性+智能指针+类型转换+核心关键字

Day5：多线程+重载隐藏重写区别+高频坑点+压轴面试题复盘

## **一、指针与引用（面试必考TOP1）**

### **1.1 指针和引用的核心区别**

**面试问题**：详细说说C++指针和引用的区别？

**核心详解**：

1. **本质不同**：指针是独立变量，存储内存地址，占用内存空间；引用是变量别名，编译期直接替换，无独立内存。

2. **初始化规则**：指针可先声明后赋值、可悬空；引用定义时必须绑定有效变量，不可空。

3. **指向修改**：指针可多次修改指向不同变量；引用一经绑定终身不可更换目标。

4. **空值特性**：指针支持nullptr/NULL；不存在合法空引用。

5. **多级支持**：支持多级指针（int**）；无多级引用（int&&& 语法非法）。

6. **sizeof结果**：sizeof(指针)=系统地址长度（32位4字节/64位8字节）；sizeof(引用)=原变量内存大小。

7. **使用开销**：指针访问变量需要解引用，有间接开销；引用直接访问变量，无开销。

**代码示例**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    // 指针定义
    int* p = &a;
    // 引用定义，必须初始化
    int& ref_a = a;

    // 指针可修改指向
    int b = 20;
    p = &b;       
    // ref_a = b;  // 仅修改a的值，无法修改引用绑定对象

    // 指针可置空
    p = nullptr;   
    // int& ref_null; // 报错：引用未初始化

    // sizeof验证
    cout << "sizeof指针：" << sizeof(p) << endl;  // 8字节（64位系统）
    cout << "sizeof引用：" << sizeof(ref_a) << endl; // 4字节（int类型）

    return 0;
}
```

**速记口诀**：指占空间可空改，引无内存绑一生；指针间接有开销，引用直访零损耗

### **1.2 const修饰指针四种写法（超高频）**

**面试问题**：说说const修饰指针的几种场景和区别？

**核心详解**：

1. const int* p / int const* p（常量指针）：指针变量可修改指向，无法通过指针修改指向的内存内容

2. int* const p（指针常量）：指针变量本身不可修改指向，可修改指向的内存内容

3. const int* const p（双const修饰）：指针指向、内存内容均不可修改

**代码示例**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;

    // 1. 常量指针：内容不可改，指针可改
    const int* p1 = &a;
    // *p1 = 100;  // 编译报错，禁止修改内容
    p1 = &b;       // 合法，修改指针指向

    // 2. 指针常量：指针不可改，内容可改
    int* const p2 = &a;
    *p2 = 100;      // 合法，修改内容
    // p2 = &b;   // 编译报错，禁止修改指针指向

    // 3. 双const：全部不可改
    const int* const p3 = &a;
    // *p3 = 200;  // 报错
    // p3 = &b;   // 报错

    return 0;
}
```

**速记口诀**：const在前锁内容，const在后锁指针，前后双锁全都封

·  指针函数：本质是【函数】，返回值是【指针】

·  函数指针：本质是【指针】，指向【函数】

### **1.3 空指针、野指针、悬空指针区别**

**面试问题**：什么是野指针？和空指针有什么区别？如何避免？

**核心详解**：

1. **空指针**：指向合法空地址（nullptr），地址可控，不会非法访问

2. **悬空指针**：指针指向的内存已被释放（delete/free），指针仍保留旧地址

3. **野指针**：指针未初始化，指向随机未知内存地址，危害最大，直接崩溃

**规避方案**：指针初始化置空、释放内存后立即置空、不返回局部变量地址

**代码示例**：

```cpp
#include <iostream>
using namespace std;

int main() {
    // 空指针：安全
    int* p1 = nullptr;

    // 野指针：危险，未初始化
    int* p2;  
    // *p2 = 100; // 运行崩溃，非法访问内存

    // 悬空指针：危险，内存已释放
    int* p3 = new int(10);
    delete p3;  
    p3 = nullptr; // 修复：释放后置空，避免悬空

    return 0;
}
```

## **二、面向对象OOP（C++核心重难点）**

### **2.1 面向对象三大特性详解**

#### **2.1.1 封装**

**面试问题**：什么是封装？访问修饰符的作用？

**核心详解**：封装是将数据和操作数据的方法封装为类，通过访问修饰符控制权限，隐藏内部实现细节，降低代码耦合度。

权限规则：

1. private：私有，仅本类内部可访问，子类、外部均不可访问

2. protected：保护，本类+子类可访问，外部不可访问

3. public：公有，本类、子类、外部均可访问

**代码示例**：

```cpp
#include <iostream>
using namespace std;

class Person {
private:
    string password; // 私有数据，外部隐藏
protected:
    string name;     // 子类可访问
public:
    int age;         // 全局可访问
    // 对外提供接口，操作私有数据
    void setPwd(string pwd) { password = pwd; }
};

class Student : public Person {
public:
    void showInfo() {
        name = "张三";    // 合法，protected子类可访问
        // password = "123"; // 报错，private子类不可访问
    }
};

int main() {
    Person p;
    p.age = 18;
    p.setPwd("456");
    // p.name = "李四"; // 报错，protected外部不可访问
    return 0;
}
```

**速记口诀**：私有本类独享，保护父子共享，公有全部开放，数据藏私接口外扬

#### **2.1.2 继承**

**面试问题**：三种继承方式的区别？虚继承的作用？

**核心详解**：

1. 公有继承(public)：父类权限原样继承，父public→子public、父protected→子protected

2. 保护继承(protected)：父类公有全部降级为子类保护权限

3. 私有继承(private)：父类公有、保护权限全部降级为子类私有权限

4. 虚继承：通过virtual修饰继承，解决**菱形继承数据冗余、二义性问题**，保证子类只保留一份父类成员

- 虚继承只解决菱形继承问题

- virtual 加在中间父类上（B、C），不是加在祖父类或孙子类

- 虚继承后，最终子类只有一份祖先成员，无冗余、无二义性

- 底层靠 虚基类指针（vbptr） 实现共享

**继承权限对照表**

| 继承方式 | 父类public | 父类protected | 父类private |
| --- | --- | --- | --- |
| public继承 | public | protected | 不可见 |
| protected继承 | protected | protected | 不可见 |
| private继承 | private | private | 不可见 |

**虚继承代码示例（解决菱形继承）**：

```cpp
#include <iostream>
using namespace std;

// 顶层父类
class A {
public:
    int num = 10;
};

// 虚继承，避免重复继承A
class B : virtual public A {};
class C : virtual public A {};

// 子类D同时继承B、C，仅保留一份A成员
class D : public B, public C {};

int main() {
    D d;
    cout << d.num << endl; // 无歧义，正常输出10
    return 0;
}
```

**速记口诀**：公继权限原样留，保继全变保护态，私继全收私有藏，虚继去重解歧义

#### **2.1.3 多态（重中之重）**

**面试问题**：C++多态的实现原理？静态多态和动态多态区别？

**核心详解**：

1. **静态多态（编译期）**：编译阶段确定函数调用地址，包含函数重载、运算符重载，效率高

2. **动态多态（运行期）**：运行阶段确定函数调用地址，通过**虚函数、虚表、虚指针**实现

**动态多态底层原理**：

1. 包含虚函数的类，编译器自动生成一张**虚函数表(vtable)**，存储所有虚函数地址，一个类仅一张虚表

2. 该类的每个对象，首地址自带一个**虚表指针(vptr)**，指向当前类的虚表

3. 父类指针/引用指向子类对象时，运行时通过vptr查找vtable，调用对应子类重写的函数，实现动态绑定

**核心禁忌**：含有虚函数的类，析构函数必须加virtual，否则子类析构无法调用，造成内存泄漏

**代码示例**：

```cpp
#include <iostream>
using namespace std;

class Base {
public:
    // 虚函数，实现动态多态
    virtual void func() { cout << "父类函数" << endl; }
    // 虚析构函数
    virtual ~Base() { cout << "父类析构" << endl; }
};

class Derive : public Base {
public:
    // 重写虚函数
    void func() override { cout << "子类函数" << endl; }
    ~Derive() { cout << "子类析构" << endl; }
};

int main() {
    // 父类指针指向子类对象，触发多态
    Base* p = new Derive();
    p->func(); // 调用子类重写函数
    delete p;   // 先析构子类，再析构父类，无内存泄漏
    return 0;
}
```

**速记口诀**：重载编译定，虚函运行派；虚表存地址，对象带vptr，虚析必加防泄漏

### **2.2 类四大默认成员函数+深浅拷贝**

**面试问题**：类的四大默认函数是什么？深浅拷贝的区别和使用场景？

**核心详解**：

1. **构造函数**：与类名同名、无返回值、可重载，对象创建时自动调用，初始化成员

2. **析构函数**：~类名、无参无返回、唯一不可重载，对象销毁时自动调用，释放资源

3. **拷贝构造函数**：A(const A& other)，用已有对象初始化新对象

触发时机：对象初始化、函数值传参、函数值返回对象

4. **赋值重载函数**：A& operator=(const A& other)，两个已存在对象赋值

**深浅拷贝核心区别**：

1. 浅拷贝：直接拷贝内存地址，多个对象共享同一块堆内存，析构时重复释放导致程序崩溃

2. 深拷贝：重新开辟堆内存，每个对象独占资源，无冲突

规则：**类中有堆内存成员，必须手动实现深拷贝、赋值重载、析构函数**

**代码示例（深浅拷贝对比）**：

```cpp
#include <iostream>
#include <cstring>
using namespace std;

// 浅拷贝（默认生成）
class ShallowCopy {
public:
    char* str;
    ShallowCopy() {
        str = new char[10];
        strcpy(str, "test");
    }
    ~ShallowCopy() { delete[] str; }
};

// 深拷贝（手动实现）
class DeepCopy {
public:
    char* str;
    DeepCopy() {
        str = new char[10];
        strcpy(str, "test");
    }
    // 手动深拷贝构造
    DeepCopy(const DeepCopy& other) {
        // 重新开辟内存，不共享地址
        str = new char[10];
        strcpy(str, other.str);
    }
    // 赋值重载
    DeepCopy& operator=(const DeepCopy& other) {
        if (this == &other) return *this; // 自赋值判断
        delete[] str; // 释放旧资源
        str = new char[10];
        strcpy(str, other.str);
        return *this;
    }
    ~DeepCopy() { delete[] str; }
};

int main() {
    // 浅拷贝会崩溃
    // ShallowCopy s1;
    // ShallowCopy s2 = s1; // 共享堆内存，析构重复释放崩溃

    // 深拷贝安全
    DeepCopy d1;
    DeepCopy d2 = d1;
    return 0;
}
```

**速记口诀**：栈成员浅拷无忧，堆成员必写深拷，默认浅拷共享崩，手动深拷独占有

### **2.3 重载、重写、隐藏区别（高频辨析）**

**面试问题**：详细区分函数重载、重写、隐藏？

**核心详解+代码示例**：

1. **重载**：同一作用域、函数名相同、参数列表不同（个数/类型/顺序），返回值不参与区分

2. **重写（覆盖）**：父子类继承关系、虚函数、函数签名完全一致，运行期多态

3. **隐藏**：父子类同名非虚函数，子类函数隐藏父类函数，无多态

```cpp
#include <iostream>
using namespace std;

class Base {
public:
    // 虚函数，可重写
    virtual void func(int a) { cout << "父类虚函数" << endl; }
    // 普通函数，会被隐藏
    void show() { cout << "父类普通函数" << endl; }
};

class Derive : public Base {
public:
    // 重写：虚函数、签名一致
    void func(int a) override { cout << "子类重写函数" << endl; }
    // 隐藏：同名非虚函数
    void show() { cout << "子类普通函数" << endl; }
    // 重载：同类同名不同参数
    void show(int a) { cout << "子类重载函数" << endl; }
};

int main() {
    Derive d;
    d.func(1);    // 重写生效
    d.show();     // 隐藏生效
    d.show(10);   // 重载生效
    return 0;
}
```

## **三、内存管理（笔试高频）**

### **3.1 C++五大内存分区详解**

**面试问题**：C++内存分为哪几个区域？各自存储什么？

**核心详解**：

1. **栈区(stack)**：存储局部变量、函数形参、临时对象；系统自动申请释放，内存小、速度快、向下增长

2. **堆区(heap)**：存储new/malloc开辟的动态内存；程序员手动申请释放，内存大、速度慢、向上增长

3. **全局/静态区**：存储全局变量、static静态变量；程序启动分配，进程结束释放，全局唯一

4. **常量区**：存储字符串常量、const全局常量；只读属性，不可修改

5. **代码段**：存储编译后的二进制机器指令；只读，程序运行期间不变

**代码示例（分区验证）**：

```cpp
#include <iostream>
using namespace std;

int global_num = 10; // 全局区
static int static_num = 20; // 静态区
const int const_num = 30; // 常量区

int main() {
    int local_num = 40; // 栈区
    int* heap_num = new int(50); // 堆区

    cout << "栈区地址：" << &local_num << endl;
    cout << "堆区地址：" << heap_num << endl;
    cout << "全局区地址：" << &global_num << endl;
    cout << "静态区地址：" << &static_num << endl;
    cout << "常量区地址：" << &const_num << endl;

    delete heap_num;
    return 0;
}
```

**速记口诀**：栈自动快且小，堆手动大且慢，全局静态随进程，常量代码只读锁

### **3.2 new/delete与malloc/free核心区别**

**面试问题**：new和malloc的区别？delete和free的区别？

**核心详解**：

1. 归属不同：malloc/free是C标准库函数，new/delete是C++运算符

2. 初始化不同：malloc仅分配裸内存，不初始化；new分配内存+自动调用构造函数初始化

3. 资源释放不同：free仅释放内存，不调用析构；delete先调用析构释放对象资源，再释放内存

4. 报错机制不同：malloc失败返回NULL空指针；new失败抛出bad_alloc异常

5. 使用方式不同：malloc需要手动指定内存字节大小；new自动匹配类型大小

6. 重载支持：new/delete支持重载，malloc/free不可重载

**代码示例对比**：

```cpp
#include <iostream>
#include <cstdlib>
using namespace std;

class Test {
public:
    Test() { cout << "构造函数调用" << endl; }
    ~Test() { cout << "析构函数调用" << endl; }
};

int main() {
    // malloc：仅分配内存，不调用构造
    Test* t1 = (Test*)malloc(sizeof(Test));
    free(t1); // 仅释放内存，不调用析构

    // new：分配内存+调用构造
    Test* t2 = new Test();
    delete t2; // 调用析构+释放内存

    return 0;
}
```

**速记口诀**：new构析抛异常，malloc裸内存返空，new智能malloc拙

### **3.3 delete与delete[]区别（易错）**

**面试问题**：new[]创建的数组能用delete释放吗？为什么？

**核心详解**：

1. new 单个对象 → 匹配 delete：仅释放单个对象内存，调用一次析构

2. new[] 数组对象 → 必须匹配 delete[]：释放全部数组内存，逐个调用所有元素析构

3. 错误后果：new[]搭配delete，仅释放数组首元素内存、只调用首元素析构，剩余内存泄漏、程序崩溃

**代码示例**：

```cpp
#include <iostream>
using namespace std;

class Test {
public:
    ~Test() { cout << "析构调用" << endl; }
};

int main() {
    // 正确匹配
    Test* t1 = new Test;
    delete t1;

    Test* t2 = new Test[3];
    delete[] t2; // 调用3次析构，完全释放内存

    // 错误写法：内存泄漏
    // delete t2; 

    return 0;
}
```

**速记口诀**：数组必配delete[]，单个直接用delete，混用泄漏必崩溃

## **四、STL容器（笔试手撕高频）**

### **4.1 STL容器分类及核心特性**

**面试问题**：STL有哪些容器？各自底层实现和优缺点？

**核心详解+代码示例**：

#### **4.1.1 序列容器（有序连续/线性存储）**

1. **vector动态数组**：底层连续内存，随机访问O(1)，尾部插入删除O(1)，中间操作O(n)，1.5/2倍扩容

2. **list双向链表**：底层离散内存，插入删除O(1)，无扩容，随机访问O(n)

3. **deque双端队列**：分段连续内存，头尾操作O(1)，中间操作低效

4. **forward_list单向链表**：仅支持正向遍历，内存开销更小

#### **4.1.2 关联容器（红黑树、有序去重）**

1. set/multiset：存储值，set值唯一，multiset值可重复，查找O(logn)

2. map/multimap：存储键值对，map键唯一，multimap键可重复，有序存储

#### **4.1.3 无序容器（哈希表、C++11）**

unordered_set/unordered_map：哈希表实现，平均查找O(1)，无序，最坏O(n)

### **4.2 vector扩容机制（超高频）**

**面试问题**：vector扩容原理？扩容为什么会导致迭代器失效？

**核心详解**：

1. 当vector容量满时，自动开辟新内存（MSVC1.5倍扩容，GCC2倍扩容）

2. 将旧内存所有元素拷贝至新内存，释放旧内存空间

3. 旧内存被释放，原有迭代器指向无效内存，全部迭代器失效

**代码示例**：

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    cout << "初始容量：" << v.capacity() << endl;
    for (int i = 0; i < 10; i++) {
        v.push_back(i);
        cout << "插入" << i << " 容量：" << v.capacity() << endl;
    }
    return 0;
}
```

### **4.3 迭代器失效场景（必考）**

**核心详解**：

1. vector：insert/erase/扩容，所有迭代器失效

2. list：仅被删除元素的迭代器失效，其余迭代器有效

3. unordered_map：rehash扩容后，全部迭代器失效

**速记口诀**：vector一动全失效，list删谁谁失效，哈希扩容全清零

## **五、C++11/14/17新特性（面试热门）**

### **5.1 auto与decltype**

**核心详解**：

1. auto：编译期自动推导变量类型，简化代码，不能用于函数参数、类成员

2. decltype：获取表达式的类型，不执行表达式，可用于模板类型推导

**代码示例**：

```cpp
#include <iostream>
using namespace std;

int main() {
    auto a = 10;        // 推导为int
    auto b = 3.14;      // 推导为double
    decltype(a + b) c;  // 推导为double类型
    return 0;
}
```

### **5.2 右值引用与移动语义**

**面试问题**：左值右值区别？右值引用的作用？

**核心详解**：

1. 左值：可寻址、生命周期长（普通变量、对象）

2. 右值：不可寻址、临时存在（字面量、临时对象）

3. 右值引用(&&)：绑定临时右值，实现**移动语义**，转移堆资源所有权，替代深拷贝，大幅提升性能

4. std::move：强制将左值转为右值，触发移动语义

**代码示例**：

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s1 = "hello world";
    string s2 = s1;        // 深拷贝，复制内容
    string s3 = move(s1);  // 移动语义，转移资源，s1变为空
    return 0;
}
```

**速记口诀**：左值可址生命周期长，右值临时转瞬消，右引移资省拷贝，move强转性能高

### **5.3 Lambda表达式**

**核心详解**：就地定义匿名函数，简化STL算法调用，格式：[捕获方式](参数列表)->返回值类型{函数体}

捕获规则：[]无捕获、[=]值捕获、[&]引用捕获、[this]捕获类成员

**代码示例**：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1,3,2,5,4};
    // lambda排序
    sort(v.begin(), v.end(), [](int a, int b){
        return a > b;
    });
    return 0;
}
```

### **5.4 智能指针（解决内存泄漏）**

**面试问题**：三种智能指针区别？如何解决循环引用？

**核心详解+代码示例**：

1. **unique_ptr**：独占所有权，禁止拷贝，仅支持move转移，开销最小，适合独占资源

2. **shared_ptr**：共享所有权，引用计数机制，计数为0自动释放；存在**循环引用内存泄漏**问题

3. **weak_ptr**：弱引用，不增加引用计数，专门配合shared_ptr解决循环引用，不可直接解引用

**循环引用解决方案代码**：

```cpp
#include <iostream>
#include <memory>
using namespace std;

class B;
class A {
public:
    // shared_ptr<B> b; // 循环引用，泄漏
    weak_ptr<B> b; // 弱指针破环
    ~A() { cout << "A析构" << endl; }
};

class B {
public:
    shared_ptr<A> a;
    ~B() { cout << "B析构" << endl; }
};

int main() {
    shared_ptr<A> a = make_shared<A>();
    shared_ptr<B> b = make_shared<B>();
    a->b = b;
    b->a = a;
    return 0;
}
```

**速记口诀**：unique独占不拷贝，shared计数怕循环，weak无计破泄漏

### **5.5 nullptr关键字**

替代C语言NULL（本质是0），是专门的空指针类型，避免int与指针重载歧义，类型安全。

## **六、核心关键字与类型转换**

### **6.1 static关键字三大场景**

**核心详解+代码**：

1. **局部static变量**：生命周期全局，仅初始化一次，函数调用保留上次值

2. **类static成员**：不属于对象，属于类，全局区存储，类外初始化，所有对象共享

3. **全局static变量/函数**：作用域仅限当前源文件，外部文件不可访问

```cpp
#include <iostream>
using namespace std;

void test() {
    static int num = 0; // 仅初始化一次
    num++;
    cout << num << endl;
}

int main() {
    test(); // 1
    test(); // 2
    test(); // 3
    return 0;
}
```

### **6.2 extern关键字**

声明外部变量/函数，告诉编译器变量/函数定义在其他文件，不分配内存，仅用于跨文件共享。

### **6.3 C++四种强制类型转换**

1. **static_cast**：常规安全转换（基础类型、父子类转换），编译期检查

2. **dynamic_cast**：多态类转换，运行期检查，失败返回nullptr，安全

3. **const_cast**：唯一可去除const/volatile属性的转换

4. **reinterpret_cast**：二进制强制转换，无检查，高危慎用

### **6.4 高频修饰符**

1. **inline内联函数**：编译期代码替换，消除函数调用开销，有类型检查，优于宏定义；函数庞大/递归会失效

2. **volatile**：禁止编译器优化，每次从内存读取变量，用于多线程共享变量、硬件寄存器

3. **explicit**：禁止单参构造函数隐式类型转换，避免歧义

```cpp
#include <iostream>
using namespace std;

class Test {
public:
    explicit Test(int a) {}
};

int main() {
    // Test t = 10; // 报错，禁止隐式转换
    Test t(10); // 仅显式调用合法
    return 0;
}
```

## **七、多线程基础（进阶面试）**

### **7.1 互斥锁与RAII锁**

1. **mutex互斥锁**：保护临界区，保证同一时间仅一个线程访问共享资源

2. **lock_guard**：RAII机制，出作用域自动解锁，不可移动、不可复制

3. **unique_lock**：灵活锁，支持延迟加锁、手动解锁、移动赋值

**代码示例**：

```cpp
#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

mutex mtx;
int num = 0;

void add() {
    lock_guard<mutex> lock(mtx); // 自动加锁解锁
    num++;
    cout << num << endl;
}

int main() {
    thread t1(add);
    thread t2(add);
    t1.join();
    t2.join();
    return 0;
}
```

### **7.2 条件变量condition_variable**

配合mutex使用，实现线程等待、唤醒机制，常用于生产者消费者模型，避免轮询浪费CPU资源。

## **八、高频压轴面试题（查漏补缺）**

### **8.1 构造函数为什么不能是虚函数？**

虚函数依赖虚表指针vptr，而对象创建时，先执行构造函数初始化成员，再初始化vptr。构造函数执行期间vptr未初始化，无法查找虚表，因此构造函数不能为虚函数。

### **8.2 析构函数为什么必须是虚函数？**

父类指针指向子类对象时，若析构非虚，仅调用父类析构，子类资源无法释放，造成内存泄漏；虚析构可触发多态，先析构子类再析构父类。

### **8.3 纯虚函数与抽象类**

纯虚函数：virtual void func() = 0;，无函数实现；包含纯虚函数的类为抽象类，**无法实例化对象**，仅用于定义接口规范，必须被子类重写。

### **8.4 引用能否作为函数返回值？**

可以！但**禁止返回局部变量引用**（局部变量栈内存销毁，引用悬空）；可返回全局变量、静态变量、类成员变量引用，减少拷贝开销。

### **8.5 宏定义与inline函数区别**

1. 宏：预处理纯文本替换，无类型检查、无作用域，易出错

2. inline：编译期代码替换，有严格类型检查、安全、支持作用域

